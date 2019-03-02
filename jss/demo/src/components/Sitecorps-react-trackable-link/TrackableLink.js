"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var prop_types_1 = __importDefault(require("prop-types"));
/* Modules needed for link tracking */
var sitecore_jss_tracking_1 = require("@sitecore-jss/sitecore-jss-tracking");
var axios_1 = __importDefault(require("axios"));
var transformScJssConfig = function() {
  // config.js may not exist if you've never run setup
  // so if it doesn't we substitute a fake object
  let config;
  try {
    // eslint-disable-next-line global-require
    config = require('../../temp/config.js');
  } catch (e) {
    return {};
  }

  if (!config) return {};

  return {
    sitecoreApiKey: config.sitecoreApiKey,
    sitecoreApiHost: config.sitecoreApiHost,
  };
};
var config = transformScJssConfig();

/* Tracking Api options - set the url with query string for tracking api */
var trackingApiOptions = {
    host: config.sitecoreApiHost,
    querystringParams: {
        sc_apikey: config.sitecoreApiKey,
    },
    fetcher: dataFetcher
};
/* Tracking Me --> call the tracking api and trigger the passed goal or/and event */
var TrackMe = function (_goalId, _eventId) {
    var dataToPass;
    if (_goalId !== undefined && _eventId !== undefined) {
        dataToPass = [{ goalId: _goalId }, { eventId: _eventId }];
    }
    else if (_goalId !== undefined && _eventId == undefined) {
        dataToPass = [{ goalId: _goalId }];
    }
    else if (_goalId == undefined && _eventId !== undefined) {
        dataToPass = [{ eventId: _eventId }];
    }
    if (dataToPass !== undefined) {
        sitecore_jss_tracking_1.trackingApi
            .trackEvent(dataToPass, trackingApiOptions)
            .then(function () { return console.log('Page event pushed'); })
            .catch(function (error) { return console.error(error); });
    }
};
/* Data Fetcher */
function dataFetcher(url, data) {
    return axios_1.default({
        url: url,
        method: data ? 'POST' : 'GET',
        data: data,
        withCredentials: true,
    });
}
exports.dataFetcher = dataFetcher;
exports.TrackableLink = function (_a) {
    var field = _a.field, editable = _a.editable, children = _a.children, showLinkTextWithChildrenPresent = _a.showLinkTextWithChildrenPresent, otherProps = __rest(_a, ["field", "editable", "children", "showLinkTextWithChildrenPresent"]);
    var dynamicField = field;
    if (!field || (!dynamicField.editableFirstPart && !dynamicField.value && !dynamicField.href)) {
        return null;
    }
    var resultTags = [];
    // EXPERIENCE EDITOR RENDERING
    if (editable && dynamicField.editableFirstPart) {
        var markup = dynamicField.editableFirstPart + dynamicField.editableLastPart;
        // in an ideal world, we'd pre-render React children here and inject them between editableFirstPart and editableLastPart.
        // However, we cannot combine arbitrary unparsed HTML (innerHTML) based components with actual vDOM components (the children)
        // because the innerHTML is not parsed - it'd make a discontinuous vDOM. So, we'll go for the next best compromise of rendering the link field and children separately
        // as siblings. Should be "good enough" for most cases - and write your own helper if it isn't. Or bring xEditor out of 2006.
        var htmlProps = __assign({ className: 'sc-link-wrapper', dangerouslySetInnerHTML: {
                __html: markup,
            } }, otherProps, { key: 'editable' });
        resultTags.push(react_1.default.createElement("span", __assign({}, htmlProps)));
        // don't render normal link tag when editing, if no children exist
        // this preserves normal-ish behavior if not using a link body (no hacks required)
        if (!children) {
            return resultTags[0];
        }
    }
    // handle link directly on field for forgetful devs
    var link = dynamicField.href ? field : dynamicField.value;
    if (!link) {
        return null;
    }
    var anchorAttrs = {};
    /* Update the anchor attributes --> pass goal Id and event Id , onClick action calling TrackMe method */
    if ((link.goalId && link.goalId != '') || (link.eventId && link.eventId != '')) {
        anchorAttrs = {
            href: link.href,
            className: link.class,
            title: link.title,
            target: link.target,
            goalId: link.goalId,
            eventId: link.eventId,
            onClick: function () { TrackMe(link.goalId, link.eventId); }
        };
    }
    else {
        anchorAttrs = {
            href: link.href,
            className: link.class,
            title: link.title,
            target: link.target,
        };
    }
    if (anchorAttrs.target === '_blank' && !anchorAttrs.rel) {
        // information disclosure attack prevention keeps target blank site from getting ref to window.opener
        anchorAttrs.rel = 'noopener noreferrer';
    }
    var linkText = showLinkTextWithChildrenPresent || !children ? (link.text || link.href) : null;
    resultTags.push(react_1.default.createElement('a', __assign({}, anchorAttrs, otherProps, { key: 'link' }), linkText, children));
    return react_1.default.createElement(react_1.default.Fragment, null, resultTags);
};
exports.TrackableLink.propTypes = {
    field: prop_types_1.default.oneOfType([
        prop_types_1.default.shape({
            href: prop_types_1.default.string,
        }),
        prop_types_1.default.shape({
            value: prop_types_1.default.object,
            editableFirstPart: prop_types_1.default.string,
            editableLastPart: prop_types_1.default.string,
        }),
    ]),
    editable: prop_types_1.default.bool,
};
exports.TrackableLink.defaultProps = {
    editable: true,
};
exports.TrackableLink.displayName = 'TrackableLink';
