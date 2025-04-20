const router = require("express").Router();
const fs = require("fs");
const path = require("path");
const db = require("../db");
const { application } = require("express");

router.get("/groups", (req, res) => {
  let sql = fs
    .readFileSync(path.resolve(process.env.BASEDIR, "sql/groups.sql"))
    .toString();

  db(sql)
    .then(data => {
      const structuredGroupArray = Object.values(data.reduce((acc, obj) => {
        if (acc[obj.group_id]) {
          acc[obj.group_id].nodes.push({
            id: obj.node_id,
            caption: obj.node_caption,
            status: {
              color: obj.node_status_color,
              description: obj.node_status_description,
            },
            interface: {
              caption: obj.interface_caption,
              status: {
                color: obj.interface_status_color,
                description: obj.interface_status_description,
              },
            },
            admin: {
              email: obj.admin_email,
              firstname: obj.admin_firstname,
              lastname: obj.admin_lastname,
            },
            application: obj.application_caption,
          });
        } else {
          acc[obj.group_id] = {
            id: obj.group_id,
            caption: obj.group_caption,
            nodes: [{
              id: obj.node_id,
              caption: obj.node_caption,
              status: {
                color: obj.node_status_color,
                description: obj.node_status_description,
              },
              interface: {
                caption: obj.interface_caption,
                status: {
                  color: obj.interface_status_color,
                  description: obj.interface_status_description,
                },
              },
              admin: {
                email: obj.admin_email,
                firstname: obj.admin_firstname,
                lastname: obj.admin_lastname,
              },
              application: obj.application_caption,
            }]
          };
        }
        return acc;
      }, {}));

      return res.json(structuredGroupArray);
    })
    .catch(err => {
      return res.status(500).json(err);
    });
});


let currentOffset = 0;

router.get("/metrics", (req, res) => {
  let sql = fs
    .readFileSync(path.resolve(process.env.BASEDIR, "sql/metrics.sql"))
    .toString();
    
  sql += ` LIMIT 16 OFFSET ${currentOffset}`;
  
  currentOffset = (currentOffset + 16) % 176;

  db(sql)
    .then(data => {
      const structuredMetricArray = data.map(obj => ({
        id: obj.metric_id,
        datetime: obj.metric_datetime,
        utilization: {
          cpu: obj.metric_cpu_util,
          memory: obj.metric_memory_util,
          disc: obj.metric_disc_util
        },
        node: {
          id: obj.node_id,
          caption: obj.node_caption,
        }
      }));
      
      return res.json(structuredMetricArray);
    })
    .catch(err => {
      return res.status(500).json(err);
    });
});

module.exports = router;
