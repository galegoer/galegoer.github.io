import React, {useEffect, useState} from "react";
import Parse from 'parse';


function RandomVideo(props) {
    
    const [vidIds, setVidIds] = useState([]); // maybe add default video?

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
    }, []);

    async function provideVid() {
        // get most recent random video
        // const VideoClass = Parse.Object.extend('VideoClass');
        let query = new Parse.Query('VideoClass');
        query.ascending('createdAt');
        query.limit(4);
        const videoIds = await query.find();
        console.log('videoIds: \n');
        console.log(videoIds);
        try {
          const idArray = [];
          videoIds.forEach((id) => idArray.push(id.get('videoId')));
          setVidIds(idArray);
        } catch (error) {
          console.error('Error while fetching VideoClass', error);
        }
    }
    
    return (
      <div>
        <div className="video-responsive" style={videostyle} >
          {vidIds}
          <br />
          <iframe
            style={iframestyle}
            width="853"
            height="480"
            src={`https://www.youtube.com/embed/${vidIds[0]}`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Embedded youtube"
          />
        </div>
        Last 3 recommended videos
        {vidIds.slice(1).map(id => (
          <div className="video-responsive" style={videostyle} >
            {id}
            <br />
            <iframe
              style={iframestyle}
              width="853"
              height="480"
              src={`https://www.youtube.com/embed/${id}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Embedded youtube"
            />
          </div>
        ))}
      </div>
    );
}

export default RandomVideo;