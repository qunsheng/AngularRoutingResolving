AngularRoutingResolving
=======================

A simple AngularJS project demonstrating routing and resolving.


Some times we want rout to a new page only when the new page finish it ajax loading. 
One way to do it is to block the new page before the ajax call finished. 
This example demonstrate using a better solution by using resove/promise/$q.defer.
The approach is when we request a page routing, 
we make a promise using $q.defere(), 
then make an ajax call with a call back function.
After the ajax call finished, the call back function will get called.
If we find the data in the call back function, then we resove the promise.
If not, we reject the promise.


Another benifit of this approach is if the ajax call failed, 
we don't need display a blank page and give user a better user experience.

