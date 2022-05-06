import React, {useEffect, useState} from "react";
import Parse from 'parse';

function RandomVideo(props) {
    
    const [vidId, setVidId] = useState(""); // maybe add default video?

    // temp may change to css files
    const videostyle = {
      overflow: 'hidden',
      paddingBottom: '56.25%',
      position: 'relative',
      height: 0
    };
    const iframestyle = {
      left: 0,
      top: 0,
      height: '100%',
      width: '100%',
      position: 'absolute'
    };

    useEffect(() => {
        provideVid();
    });

    async function provideVid() {
        // get most recent random video
        const VideoClass = Parse.Object.extend('VideoClass');
        let query = new Parse.Query(VideoClass);
        query.ascending('createdAt');
        try {
          const results = await query.first();
          const videoId = results.get('videoId');
          console.log(videoId);
          setVidId(videoId);
        } catch (error) {
          console.error('Error while fetching VideoClass', error);
        }
    }
    
    return (
      <div className="video-responsive" style={videostyle} >
        <iframe
          style={iframestyle}
          width="853"
          height="480"
          src={`https://www.youtube.com/embed/${vidId}`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Embedded youtube"
        />
      </div>
    );
}

export default RandomVideo;