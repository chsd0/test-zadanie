SELECT g.id AS group_id,
	g.caption AS group_caption, 
	n.id AS node_id,
	n.caption AS node_caption, 
	i.caption AS interface_caption,
	si.color AS interface_status_color,
	si.description AS interface_status_description,
	a.caption AS application_caption,
	sn.color AS node_status_color, 
	sn.description AS node_status_description,
	u.email AS admin_email,
	u.firstname AS admin_firstname,
	u.lastname AS admin_lastname
FROM groups g
INNER JOIN groups_nodes gn ON g.id = gn.group_id
INNER JOIN nodes n ON gn.node_id = n.id
INNER JOIN statuses sn ON n.status = sn.Id
INNER JOIN users u ON n.admin = u.id
INNER JOIN interfaces i ON n.interface = i.id
INNER JOIN statuses si ON i.status = si.Id
INNER JOIN nodes_applications na ON n.id = na.node_id
INNER JOIN applications a ON na.application_id = a.id
