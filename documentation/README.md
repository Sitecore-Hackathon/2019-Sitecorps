# Documentation

**Sitecore JSS React - Trackable Links**

## Summary

## Category:
Best enhancement to JSS to change a JSS component rendering behavior based on user's session data

## Submission
**Trackable Links Module** 
> Empower marketers to trigger any goal or event from Sitecore link fields in JSS.

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

![Deploy Marketing Definition](images/Deploy-marketing-definitions.png?raw=true "Deploy Marketing Definition")


## Configuration

Everything should be included in the provided package and steps above

## Usage

The provided package will include demo items that we will explain how it works and how it can be used in other areas

-  We create a React component that Extend the original Link component, and we named it **TrackableLink**
- To use this component, you can reference it from any React component like this, Note that the usage of TrackableLink is the same as the original Link, so it still support all the Link features and properties:
![Trackable Link Usage](images/TrackableLinkUsage.png?raw=true "Trackable Link Usage")
- Thats it! thats all you need to start tracking links from within general link field, Next will show you how would you select goal/event and how to personalize content based on visitor clicks
- In our demo, We created a template with two links, Each one will trigger differnt Goal, Go to /sitecore/content/demo/home/TrackingLinks and open experience editor, You will see this component on the page:
![Trackable Link Rendering Example](images/TrackableLinkRendering.png?raw=true "Trackable Link Rendering Example")
- Choose one of links fields, and click on "Edit Link" button and you will see the following screen where you set goal or event for this link:
![Insert Link Dialog](images/InsertLinkDialog.png?raw=true "Insert Link Dialog")
- Do the same for the other Link field
- If you clear your session by going to http://sc910.sc.jssdemo/sitecore/api/jss/track/flush, this will flush the current user session and submit it to xConnect, You can go to Analytics Reports to view the registered goals/events
![Goals Report](images/LinksReports.png?raw=true "Goals Report")

- To personalize content based on user clicks, you can simply use sitecore default conditional rules, For this demo we applying personalization based on triggered goal for the user session, We created another content component on the same page to show that once you click the link you can immediately see personalization applied:

![Personalized Content](images/PersonalizedContent.png?raw=true "Personalized Content")

**Want to See this in action in the demo site?**
- Go to http://sc910.sc.jssdemo/TrackingLinks
- Click on any of the link of the page (You like Red or Blue color?)
- You will imediately start seeing personalized content based on what you have clicked!

## Video

Please provide a video highlighing your Hackathon module submission and provide a link to the video. Either a [direct link](https://www.youtube.com/watch?v=EpNhxW4pNKk) to the video, upload it to this documentation folder or maybe upload it to Youtube...

[![Sitecore Hackathon Video Embedding Alt Text](https://img.youtube.com/vi/EpNhxW4pNKk/0.jpg)](https://www.youtube.com/watch?v=EpNhxW4pNKk)
