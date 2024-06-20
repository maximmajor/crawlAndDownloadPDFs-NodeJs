Quest 1: Crawl and Download PDFs


Endpoint: POST /rpa


Description: This endpoint crawls a given URL, logs in with 
provided credentials, and downloads PDFs based on the address provided.


Request Body:
json
{
  "url": "https://my-portfolio-alpha-swart.vercel.app/",
  "mustCompany": true,
  "signUpDetails": {
      "username": "kinsu83!",
      "password": "kiminsu83!"
  },
  "address": "경기도 고양시 일산동구 강석로 152 강촌마을아파트 제701동 제2층 제202호 [마두동 796]"
}




Usage:
mustCompany (optional): If set to true, the script tests only the mustCompany Quest link task.
signUpDetails (optional): Credentials for logging into the website.
address (optional): Address to search and download the PDF.