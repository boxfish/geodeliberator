Server REST API
===============

* user/
    * description: get the information about the user
	* parameters: userId
    * returns: id, userName, email, first_name, last_name; id='-1' if user does not exist

* forums/
    * description: get the list of forums for a user
    * parameters: userId
    * returns: {participating: [{id, name}], public: [{id, name}]}

* timeline/
    * description: get the timeline data, i.e. the counts of annotations for each time unit
    * parameters: userId, forumId, unit (hour, day, week, month, year), startDate, endDate
    * returns: {timeline: [{count, month}], ealrliesData, latestDate}

* annotations/
    * description: list of annotations
    * parameters: userId, forumId, start, limit, footprintId, ownerOnly, startDate, endDate, bbox
    * returns: {totalCount, annotations: [{userName, forumId, timeCreated, excerpt, userId, content, shareLevel, timeUpdated, type, id}]}

* forum/
	forumId

* authentication/
	userName, password


* annotation/
	new, delete, userId, groupId, annotationId

* map/
	userId, annotationId, commentId, issueId, groupId


* Threads/
	annotationId, userId, groupId

