import React from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Popover from '@material-ui/core/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';

const PopoverOptions = (props) => {
    const {showPopover} = props;
    return (
        <PopupState variant="popover" popupId="demo-popup-popover">
            {(popupState) => (
                <div>
                    <Popover
                        open={showPopover}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}
                    >
                        <Box p={2}>
                            <Typography>The content of the Popover.</Typography>
                        </Box>
                    </Popover>
                </div>
            )}
        </PopupState>
    );
}

PopoverOptions.defaultProps = {
    showPopover:false,
}

export default PopoverOptions;