import React, {useEffect, useState} from "react";
import Parse from 'parse';

import { initializeParse } from '@parse/react';
import { useParseQuery } from '@parse/react';

const parse_server_url = process.env.REACT_APP_PARSE_SERVER_URL;
const parse_app_id = process.env.REACT_APP_PARSE_APP_ID;
const parse_app_js_key = process.env.REACT_APP_PARSE_JS_KEY;

initializeParse(
  parse_server_url,
  parse_app_id,
  parse_app_js_key
);



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


    const query = new Parse.Query('VideoClass');
    const {
      isLive, // Indicates that Parse Live Query is connected
      isLoading, // Indicates that the initial load is being processed
      isSyncing, // Indicates that the library is getting the latest data from Parse Server
      results, // Stores the current results in an array of Parse Objects
      count, // Stores the current results count
      error, // Stores any error
      reload // Function that can be used to reload the data
    } = useParseQuery(
      query, // The Parse Query to be used
      {
        enabled: true, // Enables the parse query (default: true)
        enableLocalDatastore: true, // Enables cache in local datastore (default: true)
        enableLiveQuery: true // Enables live query for real-time update (default: true)
      }
    );

    useEffect(() => {
        provideVid();
    }, []);

    async function provideVid() {
        // get most recent random video
        // const VideoClass = Parse.Object.extend('VideoClass');
        // let query = new Parse.Query('VideoClass');
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