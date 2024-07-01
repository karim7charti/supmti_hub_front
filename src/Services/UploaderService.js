import axios from "axios";
import swal from "sweetalert";

class UploaderService{
    constructor() {
          if (!UploaderService._instance) {
              this.isUploading=false
                this.progress=0
               this.files=[]
              this.fileNames=[]
              this.postDetails=''
              this.ChunkSize=2000000
              this.chunk=new Blob()
              this.SizeRemaining=null
              this.endOfFile=false
              this.currentFile=1
              this.countFiles=0
              this.AllFilesSizeSum=0
              this.isPaused=false
              this.activity_id="no"
              this.retry=1
              this.incompleteChunk=null
            UploaderService._instance = this;
          }
         return UploaderService._instance;
    }

    nextChunk=(TheFile,FileSize)=>{

        	if (this.SizeRemaining > 0) {

                    if (this.SizeRemaining < this.ChunkSize) {
                        this.Chunk = TheFile.slice((FileSize-this.SizeRemaining));
                        this.SizeRemaining = 0;
                        this.endOfFile=true

                    }
                    else {
                        this.Chunk = TheFile.slice((FileSize-this.SizeRemaining),((FileSize-this.SizeRemaining)+this.ChunkSize));
                        this.SizeRemaining = (this.SizeRemaining-this.ChunkSize);
                    }
            }
    }
    generateUniqueNames=()=>{
         let id='_' + Math.random().toString(36).substr(2, 9)+(new Date()).getTime();
         for(let i=0;i<this.files.length;i++)
         {
            this.fileNames[i]=id+this.files[0].name
         }
    }
    resume=()=>{
        this.isPaused=false;
        if(this.incompleteChunk===null)
            this.upload()
        else
            this.uploadChunksServer(this.incompleteChunk)
    }
    pause=()=>{
        this.isPaused=true;
    }

    nextFile=()=>{
        this.SizeRemaining=null
        this.endOfFile=false
        this.files[0]=this.files[this.currentFile]
        this.fileNames[0]=this.fileNames[this.currentFile]
        this.currentFile++
        this.upload()
    }



    uploadChunksServer=(chunk)=>{
                const xhttp = new XMLHttpRequest();
                  const token=localStorage.getItem('token');
                  let auth=token ? 'Bearer '+token:'';
            xhttp.open("POST", "http://localhost:8000/api/post/",true);
            xhttp.setRequestHeader("Authorization",auth)
            const frm=new FormData();
            frm.append("fileName",this.fileNames[0])
            frm.append("file",chunk)
            frm.append("eof",this.endOfFile)
            frm.append("activity_id",this.activity_id)
            frm.append("postDetails",this.postDetails)
            xhttp.send(frm)



              xhttp.onloadend = ()=> {
                  if( xhttp.status===200)
                  {

                     this.progress+=(chunk.size/this.AllFilesSizeSum)*100
                      this.incompleteChunk=null
                      this.retry=1
                      if(xhttp.responseText!=="chunking...")
                          this.activity_id=xhttp.responseText

                          if(this.SizeRemaining>0)
                            {

                                 this.upload()
                            }
                            else
                          {

                            if(this.currentFile<this.files.length)
                            {

                                this.nextFile()
                            }
                            else
                            {
                                this.isUploading=false
                                this.progress=0
                                this.activity_id="no"

                                swal({
                                        title: "Good job!",
                                          text: "Poste publier avec succés",
                                          icon: "success",
                                 });

                            }

                          }

                      }
                      else if(xhttp.status===401)
                      {
                            var payload={refresh_token:localStorage.getItem('refreshToken')}
                            axios.post('/api/token/refresh',payload).then(res=> {

                                localStorage.setItem('token', res.data.token)
                                this.uploadChunksServer(chunk)
                            })

                      }
                      else if(xhttp.status>=500)
                      {
                                this.isUploading=false
                                this.progress=0
                                this.activity_id="no"
                                swal({
                                        title: "oops!",
                                          text: "Le serveur est hors ligne pour le moment veuillez essayer plus tard",
                                          icon: "wraning",
                                 });
                      }
                      else
                          {
                              if(this.retry<5)
                              {
                                  this.retry++
                                  this.uploadChunksServer(chunk)
                              }
                              else
                              {
                                  this.retry=0
                                  this.incompleteChunk=chunk
                                  this.isPaused=true
                                  swal({
                                        title: "oops!",
                                          text: "Une erreur s'est produite lors le transfére des fichier " +
                                              "veuillez vérifier votre connexion internet est résumer votre transfére",
                                          icon: "warning",
                                    });
                              }

                          }
                  }

    }
     upload=()=>{
        if(!this.isPaused)
        {
            if(this.files.length>0)
                {
                    if(this.SizeRemaining===null)
                        {
                            this.SizeRemaining=this.files[0]["size"]
                            this.generateUniqueNames()
                        }

                        if(this.files[0]["size"]>this.ChunkSize)
                        {
                                    this.Chunk = new Blob();
                                    this.nextChunk(this.files[0],this.files[0]["size"]);
                                    this.uploadChunksServer(this.Chunk)
                        }
                        else {

                            this.SizeRemaining=0;
                            this.endOfFile=true
                            this.uploadChunksServer(this.files[0])
                        }
                }
        }


    }

}

const uploader=new UploaderService()



//Object.freeze(uploader)

export default uploader
