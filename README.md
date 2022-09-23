# rfp-2207-ratings-reviews
Atliers e commerce Microservice was scaled. It was scaled in AWS EC2 to use Nginx Load Balancing Server, 2 Host servers, Caching, and a single Postgres Database.  It currently is capable of handling 1000 rps with response latency of 5 ms.

# Details
## Step 1:  Pick a database

Selecting between a SQL and a NoSQL database was a little tricky. I found that alot of the data being worked with was inter related and felt using a SQL databse would benefit from this fact. I chose to go with Postgres, seing as how I had prior expereince with MySQL and wanted to learn something new.

My intial request times were painfully slow. 

<img width="849" alt="Screen Shot 2022-09-23 at 3 23 20 PM" src="https://user-images.githubusercontent.com/104694911/192064503-f097b542-523e-4d71-9b58-009edaa46d20.png">

After indexing a my query speeds averaged an increase of 92%.

## Step 2: Test under Load

At 1000 requests per second the error rate was fantastic, resting right at 0% where I wanted it.  On the other hand the latency was extremely high. Right around an average of 1700ms.
![image](https://user-images.githubusercontent.com/104694911/192065219-4a77ade1-763c-472b-94c4-a73a5104d74f.png)
