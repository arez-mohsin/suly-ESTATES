import React from 'react';
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";

import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

export default function PropertyLightbox({ 'data-qa': dataQa, ...props }) {
  return (
    <Lightbox
      plugins={[Zoom, Thumbnails, Fullscreen]}
      animation={{ fade: 250 }}
      carousel={{ preload: 2, padding: "16px" }}
      styles={{ container: { backgroundColor: "rgba(11, 13, 12, 0.98)" } }}
      portal={{ container: { 'data-qa': dataQa } }}
      {...props}
    />
  );
}
