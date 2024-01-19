import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import Collapse from "@mui/material/Collapse";
import { styled as muiStyled } from "@mui/material/styles";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useMediaState } from "../../hooks/useMediaState";
import { CardActionArea } from "@mui/material";
import { ContentType, Item, getContentType } from "../../hooks/useFetchContent";
import { getVideoURLFromPath } from "../../utils/helpers";
import Upvote from "./upvote";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlayCircle } from "@fortawesome/free-solid-svg-icons";
import { styled } from "styled-components";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = muiStyled((props: ExpandMoreProps) => {
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
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: 400 }}>
      <CardActionArea
        onClick={() => {
          setItem(item);
        }}
      >
        <MediaWrapper>
          <CardMedia
            component={contentTypeString}
            src={getVideoURLFromPath(item.public_path)}
            alt={`AI generated ${contentTypeString}`}
          />
          {contentTypeString === "video" && <StyledIcon icon={faPlayCircle} />}
          <CardContent>{children}</CardContent>
        </MediaWrapper>
        <CardContent>{children}</CardContent>
      </CardActionArea>
      <CardActionArea onClick={(e: React.MouseEvent) => handleExpandClick(e)}>
        <CardActions disableSpacing>
          <Upvote item={item} contentType={getContentType(item)} />
          <CardHeader
            title={item.name ?? "<No Title>"}
            subheader={`Created  ${
              new Date(item.created_at).toDateString() ?? "?"
            }`}
            subheaderTypographyProps={{
              fontStyle: "italic",
              fontSize: "14px",
            }}
          />
          <ExpandMore
            expand={expanded}
            onMouseDown={(e: React.MouseEvent) => e.stopPropagation()}
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

const MediaWrapper = styled.div`
  position: relative;
  &:hover {
    .icon-hover-effect {
      font-size: 5rem; // Enlarge the icon
    }
  }
`;

const StyledIcon = styled(FontAwesomeIcon).attrs({
  className: "icon-hover-effect",
})`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: rgba(255, 255, 255, 0.9);
  font-size: 4rem; // Adjust size as needed
  transition: font-size 0.3s ease; // Smooth transition for scaling
`;
