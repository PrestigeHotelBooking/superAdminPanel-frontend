import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import PrButton from '../PrButton/PrButton';
import PrIcon from '../PrIcon/PrIcon';

interface DeleteConfirmModalProps {
  open: boolean;
  onClose: () => void;
  onDelete: () => void;
  name:string;
}

const PrDeleteModalBox: React.FunctionComponent<DeleteConfirmModalProps> = ({ open, onClose, onDelete,name }) => {
  return (
    <Dialog open={open} onClose={onClose}>

        <DialogTitle className='flex flex-row gap-4 font-bold'>  <PrIcon name={'AlertTriangle'}  size={32}  color='red'></PrIcon> Are you sure you want to delete?</DialogTitle>

      <DialogContent>
        <DialogContentText className='p-3 font-bold text-black'>
     {`     This action cannot be undone. Are you sure you want to delete this  ${name}`}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
      <Button onClick={onClose} color='primary' className='rounded bg-blue-500 hover:bg-blue-600 text-white'>
          Cancel
        </Button>
        <Button onClick={onDelete} color='error' className='rounded bg-red-500 hover:bg-red-600 text-white'>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default PrDeleteModalBox;
