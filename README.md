# rfp-2207-ratings-reviews
Atliers e commerce Microservice was scaled. It was scaled in AWS EC2 to use Nginx Load Balancing Server, 2 Host servers, Caching, and a single Postgres Database.  It currently is capable of handling 1000 rps with response latency of 5 ms.

# Details
## Step 1:  Database selection

Selecting between a SQL and a NoSQL database was a little tricky. I found that alot of the data being worked with was inter related and felt using a SQL databse would benefit from this fact. I chose to go with Postgres, seing as how I had prior expereince with MySQL and wanted to learn something new.

My intial request times were painfully slow. 

<img width="849" alt="Screen Shot 2022-09-23 at 3 23 20 PM" src="https://user-images.githubusercontent.com/104694911/192064503-f097b542-523e-4d71-9b58-009edaa46d20.png">

After indexing a my query speeds averaged an increase of 92%.

## Step 2: Deployment / Load Testing

At 1000 requests per second the error rate was fantastic, resting right at 0% where I wanted it.  On the other hand the latency was extremely high. Right around an average of 1700ms.

![image](https://user-images.githubusercontent.com/104694911/192065219-4a77ade1-763c-472b-94c4-a73a5104d74f.png)

This number was unacceptable.

### Scaling 

To counteract this high latency another AWS EC2 host server was created as well as an EC2 instance to run Enginx Nginx Load Balancer. A simple round robin method was taken for dictating which server a request would go to.  This resulted in faster query times, but a striking numbert of errors began occuring halfway thorugh testing.


## Step 3: Optimization 

Caching was added to the nginx load balancer.  After caching servers were able to handle 1000 rps with a latency of < 66ms and an error rate of 0%

![](https://user-images.githubusercontent.com/104694911/192070901-00c15b06-f826-45f2-ac1d-53ab8361562a.png)

# Possible future improvments

For further optimization I woul dbe interested in seeing the possible results of implementing 2-3 more servers to handle up to 10k rps.
At a future date I would also be highly interested in vertical scaling with stronger computers.



