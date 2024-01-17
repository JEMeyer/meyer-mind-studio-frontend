import * as React from "react";
import Modal from "@mui/material/Modal";
import { useSpring, animated } from "@react-spring/web";
import { useMediaState } from "../../hooks/useMediaState";
import { Paper } from "@mui/material";

interface FadeProps {
  children: React.ReactElement;
  in?: boolean;
  onClick?: any;
  onEnter?: (node: HTMLElement, isAppearing: boolean) => void;
  onExited?: (node: HTMLElement, isAppearing: boolean) => void;
  ownerState?: any;
}

const Fade = React.forwardRef<HTMLDivElement, FadeProps>(function Fade(
  props,
  ref
) {
  const {
    children,
    in: open,
    onClick,
    onEnter,
    onExited,
    ownerState,
    ...other
  } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter(null as any, true);
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited(null as any, true);
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {React.cloneElement(children, { onClick })}
    </animated.div>
  );
});

type SpringModalProps = {
  children: React.ReactElement;
};

export default function ContentModal({ children }: SpringModalProps) {
  const [item, setItem] = useMediaState();
  const [open, setOpen] = React.useState(item != null);
  const handleClose = () => {
    setOpen(false);
    setItem(null);
  };

  React.useEffect(() => {
    if (!open && item != null) {
      setOpen(true);
    } else if (open && item == null) {
      setOpen(false);
    }
  }, [item, open]);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      keepMounted
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Fade in={open}>
        <Paper sx={{ overflow: 'auto', maxHeight: '90vh', maxWidth: '90vw' }}>
          {children}
        </Paper>
      </Fade>
    </Modal>
  );
}
