
# Disabled org cleanup script

This cleanup script allows to hard delete all data related to d isabled org.

Following are the resources from which data is deleted:

- Mongodb
- Elastic Search
- Redis 
- S3

### TO execute the script follow the steps
#### 1. Generate disabled orgs data
```bash
node generateOrgsCleanUpData.js 
```
#### 2. Clean Data
```bash
node index.js  --clean mongodb redis s3 elastic
```
### Command line flags and args

#### --clean
This flag specifies cleaning options.
Following is the list of args supported by the --clean
(At least 1 should be provided)

| arg        | Description              |
| :--------  :------------------------- |
| `mongodb`  | Cleans mongodb data |
| `s3`  | Cleans s3 data |
| `redis`  | Cleans redis data |
| `elastic`  | Cleans elastic-search data |

(Note: Above options will be sorted in the following order)
```js
[ s3, elastic, redis, mongodb ]
```
#### --forceCleanOrder

This flag will force the order of --clean args in which they are passed. (Sorting will not be performed)

#### --mongodb
This flag specifies cleaning options for mongodbs.
Following is the list of args supported by the --mongodb
(At least 1 should be provided)

| arg        | Description              |
| :--------  :------------------------- |
| `webhooks`  | Cleans webhooks db data |
| `jobs`  | Cleans jobs db data |
| `assignments`  | Cleans assignments db data |
| `recent_searches`  | Cleans recent_searches db data |
| `publish_logs`  | Cleans publish_logs db data |
| `rawcms_prod`  | Cleans rawcms_production db data |

(Note: Above options will be sorted in the following order)
```js
[ webhooks, jobs, assignments, recent_searches, publish_logs, rawcms_prod ]

```
#### --forceMongoDBsOrder

This flag will force the order of --mongodb args in which they are passed. (Sorting will not be performed)

#### --delay
This flag sets delay between cleanup of each batch.

| arg        | Description              |
| :--------  :------------------------- |
| `number`  | delay in milli second|

(Example: --delay 3000)

#### --batchSize
This flag sets batch size. Each batch size consists of number of cleanup cycles. Each cleanup cycle consits of cleaning of all data related to single organization.

| arg        | Description              |
| :--------  :------------------------- |
| `number`  | batch size|


(Example: --batchSize 2 )

2 orgs data will be cleaned and after that wait of 3000 ms will be there. And cycle continues...

### Configurable parameters

| parameter        | Description              |
| :--------  :------------------------- |
| `days`  | number of days by which disabled organization is not updated|
| `clusterToClean`  | Cluster from which to clean data|
| `organization_tags`  | Organization tags for disabled orgs|
| `logsExpireDays`  | Days after which archive data and logs will be cleaned|
| `inmemory_cache`  | Redis config|
| `storage`  | S3 config|
| `publishing`  | Elastic Search config|

### Logs and Archives
All the logs are stored in ``` logs/migration.log ``` and data of completely cleaned orgs is stored in data/archive.data 

(```logsExpireDays``` old Logs and archives will be cleaned when cleanup script runs)




