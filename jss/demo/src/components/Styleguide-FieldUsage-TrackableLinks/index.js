import React from 'react';
import { Link } from '@sitecore-jss/sitecore-jss-react';
import {TrackableLink} from '../Sitecorps-react-trackable-link/TrackableLink'
import StyleguideSpecimen from '../Styleguide-Specimen';


const StyleguideFieldUsageTrackableLinks = (props) => (
  <StyleguideSpecimen {...props} e2eId="styleguide-fieldusage-trackablelinks">
    Select what best describe you!
	<br />
    <TrackableLink field={props.fields.LinkA} />
    <br />
    <TrackableLink field={props.fields.LinkB}>
      
    </TrackableLink>
    
  </StyleguideSpecimen>
);

export default StyleguideFieldUsageTrackableLinks;
