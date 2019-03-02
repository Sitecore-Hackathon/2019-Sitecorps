# Documentation

**Sitecore JSS React - Trackable Links**

## Summary

**Category:** Best enhancement to JSS to change a JSS component rendering behavior based on user's session data

Trackable Links module will enable content authors and Marketers to assosiate Goals and Events to a general link field from Content Editor or Experience editor then track them via clicks on the links on the Sitecore JSS powered website (React) and push them back to xConnect, Which will then enable them to personalize any content based on the trigger goals/events for the jss website visitor 

## Pre-requisites

Does your module rely on other Sitecore modules or frameworks?

- Sitecore 9.1 XP0
- Enable anonymous Indexing on xConnect (See [here](https://doc.sitecore.com/developers/91/sitecore-experience-platform/en/enable-indexing-of-anonymous-contacts.html))
- Install **[Sitecore JavaScript Services Server for Sitecore 9.1 XP]** on Sitecore Instance [Link]
(https://dev.sitecore.net/Downloads/Sitecore_JavaScript_Services/110/Sitecore_JavaScript_Services_1100.aspx)

## Installation

- Install **Sitecore 9.1 (XP0 Single)**, Select **$Prefix = "sc910"** (domain to be **http://sc910.sc**)
- Install **[Sitecore JavaScript Services Server for Sitecore 9.1 XP]** on Sitecore Instance [Link]
(https://dev.sitecore.net/Downloads/Sitecore_JavaScript_Services/110/Sitecore_JavaScript_Services_1100.aspx)
- Update xconnect config to enable anonymous indexing (Switch **IndexAnonymousContactData** to true)
  - [xconnect root path]\App_Data\jobs\continuous\IndexWorker\App_data\config\sitecore\SearchIndexer\sc.Xdb.Collection.IndexerSettings.xml
  - [xconnect root path]\App_Data\Config\Sitecore\SearchIndexer\sc.Xdb.Collection.IndexerSettings.xml
- Restart all xConnect services
- Add JSS host and binding
  - In your local hosts file add **(127.0.0.1 sc910.sc.jssdemo)**
  - Add **sc910.sc.jssdemo** to your Sitecore iis bindings 
- Install Demo Package (Link to be added later) (Select **Overwrite all**)
- Publish Site
- Deploy marketing definitions (Goals and Events only) from Control Panel 

![Deploy Marketing Definition](documentation/images/Deploy-marketing-definitions.png?raw=true "Deploy Marketing Definition")


## Configuration

Everything should be included in the provided package and steps above

## Usage

The provided package will include demo items that we will explain how it works and how it can be used in other areas
1-  We create a React component that Extend the original Link component, and we named it **TrackableLink**
2- To use this component, you can reference it from any React component like this

## Video

Please provide a video highlighing your Hackathon module submission and provide a link to the video. Either a [direct link](https://www.youtube.com/watch?v=EpNhxW4pNKk) to the video, upload it to this documentation folder or maybe upload it to Youtube...

[![Sitecore Hackathon Video Embedding Alt Text](https://img.youtube.com/vi/EpNhxW4pNKk/0.jpg)](https://www.youtube.com/watch?v=EpNhxW4pNKk)
