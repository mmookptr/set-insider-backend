# Swift SET Insider Backend

Software Process and Project Management Final Project

## Production Link

- [BACKEND URL](https://set-insider-backend.herokuapp.com)

## Members

- Patteera Likitamnuayporn 6110545597
- Siwat Ponpued 6110546640
- Pawaris Wongsalung 6110545562
- Thun Thunkijjanukij 6110545546
- Nattapol Boonyapornpong 6110545503

## Prerequisite

| Name       | version                                                       |
| ---------- | ------------------------------------------------------------- |
| Node       | [10.6.3 or above](https://nodejs.org/en/download/releases/)   |
| Postgresql | [11.10 or above](https://www.postgresql.org/download/macosx/) |

<br/>

## How to run

1. Install all the dependencies

```
npm install
```

2. Config the database information in ormconfig.json  
   <br/>
3. Build

```
npm run-script build
```

4. Start the application

```
npm start
```

## Post Man

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/c1c886dcfa826bd62c8f)

## API

- Get Stock Symbols

  URL: /stock/symbol

  Method: GET

  URL Params: None

  Success:

  - Status Code: 200
  - Content:

  ```
  {
     result: ["PTT", "2S"]
  }
  ```

- Get Stock Prices    

   URL: /stock/prices

   Method: GET

   URL Params:
   - symbol=[string]

   Success:
   - Status Code: 200
   - Content:
   
   ```
   {
   "result": [
      {
         "date": "2563/12/01",
         "openPrice": 40.5,
         "closePrice": 41,
         "highestPrice": 41.5,
         "lowestPrice": 40.25,
         "changeInValue": 1,
         "changeInPercentage": 2.5,
         "totalVolume": 55259,
         "totalValue": 2266,
         "id": 14796
      }
   ]
   }
   ```

- Get Stock Official News

   URL: /stock/official-news

   Method: GET

   URL Params:
   - symbol=[string]

   Success:
   - Status Code: 200
   - Content:
   
   ```
   {
   "result": [
      {
         "date": "17 ก.ย. 2563 18:20",
         "source": "A",
         "name": "เข้าทำธุรกรรมการจำหน่ายเงินลงทุนและสินทรัพย์หมุนเวียนประเภทโครงการอสังหาริมทรัพย์ระหว่างการพัฒนา",
         "link": "/set/newsdetails.do?newsId=16002932032641&language=th&country=TH",
         "id": 130
      }
   ]
   }
   ```

- Get Stock Social Media News

   URL: /stock/socialmedia-news

   Method: GET

   URL Params:
   - symbol=[string]

   Success:
   - Status Code: 200
   - Content:
   
   ```
   {
   "result": [
      {
         "date": "2020-12-12",
         "name": "3K-BAT ชี้แจงข่าว",
         "link": "https://www.set.or.th/set/newsdetails.do?newsId=16049597968251&language=th&country=TH",
         "id": 16122
      }
   ]
   }
   ```
