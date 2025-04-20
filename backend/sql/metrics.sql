SELECT m.id AS metric_id,
	m.datetime AS metric_datetime,
	m.cpu_utilization AS metric_cpu_util,
	m.memory_utilization AS metric_memory_util,
	m.disk_utilization AS metric_disc_util,
	n.id AS node_id,
	n.caption AS node_caption
FROM metrics m 
LEFT JOIN nodes n ON m.node_id  = n.id
