import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { styled } from "@mui/material/styles";
import CardHeader from "@mui/material/CardHeader";
import Collapse from "@mui/material/Collapse";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useMediaState } from "../../hooks/useMediaState";
import { CardActionArea } from "@mui/material";
import { ContentType, Item, getContentType } from "../../hooks/useFetchContent";
import { getVideoURLFromPath } from "../../utils/helpers";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

type MediaCardProps = {
  item: Item;
  expandedContent?: React.ReactNode;
  children?: React.ReactNode;
};

export default function MediaCard({
  item,
  expandedContent,
  children,
}: MediaCardProps) {
  const [expanded, setExpanded] = React.useState(false);
  const [, setItem] = useMediaState();

  const contentTypeString =
    getContentType(item) === ContentType.PICTURE ? "img" : "video";

  const handleExpandClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: 400 }}>
      <CardActionArea
        onClick={() => {
          setItem(item);
        }}
      >
        <CardMedia
          component={contentTypeString}
          src={getVideoURLFromPath(item.public_path)}
          alt={`AI generated ${contentTypeString}`}
        />
      <CardContent>{children}</CardContent>
      </CardActionArea>
      <CardActionArea onClick={(e: React.MouseEvent) => handleExpandClick(e)}>
        <CardActions disableSpacing>
          <CardHeader
            title={item.name ?? "Placeholder"}
            subheader={item.created_at ?? "Placeholder"}
          />
          <ExpandMore
            expand={expanded}
            onClick={(e: React.MouseEvent) => handleExpandClick(e)}
            aria-expanded={expanded}
            aria-label="show details"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>{expandedContent}</CardContent>
      </Collapse>
      </CardActionArea>
    </Card>
  );
}
