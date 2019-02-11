
##Resource

 - Resource sharing vs Resource in each Module
 
 Calendar uses _N_ endpoints and therefore we added a `/Base/Resource`. Now when we have _Messaging_ in the boat also it needs to add resources from `/Base/systemmessageuser` also.
 
 **Question:** should each component be self contained or is it better to DRY the resources and have each in its folder?
  
 - CSS in components
 
 When we have a wrapper component with subcomponents and they are a "super component" together, should we have the CSS in thr wrapper or spread in the components (the one with the resp. HTML)?


 - Should we use `user` or `userprofile`?
 
 UserProfile allows for betters queries to the server. Does all calendar data is available in the userprofile?

 - active menu buttons uses "label", Button.vue usses "name" as source for label. DRY/Normalize?
