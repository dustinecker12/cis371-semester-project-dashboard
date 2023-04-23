import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

type AddButtonProps = {
  type: string;
  onButtonClick: () => void;
};

export default function AddButton({ type, onButtonClick }: AddButtonProps) {
  function handleClick() {
    onButtonClick();
  }

  return (
    <>
      {type === 'machine' ? (
        <Button
          onClick={handleClick}
          variant="outlined"
          sx={{
            height: '150px',
            width: '150px',
            margin: '10px',
            borderRadius: '10px',
            borderColor: '#6870fa',
            color: '#6870fa',
          }}
        >
          <AddIcon
            sx={{
              height: '75%',
              width: '75%',
            }}
          />
        </Button>
      ) : (
        <Button
          onClick={handleClick}
          variant="outlined"
          sx={{
            height: '75px',
            width: '75px',
            margin: '10px',
            borderRadius: '10px',
            borderColor: '#6870fa',
            color: '#6870fa',
          }}
        >
          <AddIcon
            sx={{
              height: '75%',
              width: '75%',
            }}
          />
        </Button>
      )}
    </>
  );
}
