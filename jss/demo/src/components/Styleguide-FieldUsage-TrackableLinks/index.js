/*
// Example Usage
*/
import React from 'react';
import { Link } from '@sitecore-jss/sitecore-jss-react';
import StyleguideSpecimen from '../Styleguide-Specimen';
// Import new module to use in place of Sitecore <Link />:
import {TrackableLink} from '../Sitecorps-react-trackable-link/TrackableLink'

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
