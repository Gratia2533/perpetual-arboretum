# Deploy n8n on local
This guide will help you set up n8n locally using Docker and expose it to the internet using ngrok.

## Prerequisites
- Docker installed on your system
- ngrok account (for exposing your local n8n instance to the internet)

## Check environment
### 1. Verify Docker Installation
```bash
docker --version
```
If Docker is installed in the environment, it will display the following.
```bash
Docker version 27.0.2, build 912c1dd
```

### 2. Install ngrok
Download and install [ngrok](https://ngrok.com/downloads/linux) for your operating system.

## Setup Steps

### 1. Configure ngrok
First, you need to obtain the ngrok forwarding URL:
1. Register on ngrok and get your authtoken
2. Configure ngrok with your authtoken:
```bash
ngrok config add-authtoken <YOUR_AUTHTOKEN>
```
3. Start ngrok to forward traffic to your local n8n instance:
```bash
ngrok http 5678 #Forward to port 5678
```
4. Copy the forwarding URL (e.g., https://xxxx-xx-xx-xxx-xx.ngrok.io) - you'll need this for the WEBHOOK_URL

### 2. Deploy n8n with Docker
```bash
docker run -it --rm \
  --name n8n \ #Container name
  -p 5678:5678 \ #Map container port to host port
  -e WEBHOOK_URL=<ngrok_url> \ #Your ngrok forwarding URL
  -e GENERIC_TIMEZONE="Asia/Taipei" \ #Set timezone
  -e TZ="Asia/Taipei" \ #Set timezone
  -v ~/.n8n \ #Data storage location
  n8nio/n8n:<version> #Default is latest
```

## Access n8n
- Local access: http://localhost:5678
- Remote access: Use your ngrok URL (https://xxxx-xx-xx-xxx-xx.ngrok.io)

## Important Notes
1. The `-v ~/.n8n` volume mount ensures your workflows and credentials persist between container restarts
2. Make sure to replace `<ngrok_url>` with your actual ngrok forwarding URL
3. The container will be removed when stopped due to the `--rm` flag. Remove this flag if you want to keep the container

## Troubleshooting
1. If you can't access n8n locally:
   - Check if Docker is running
   - Verify port 5678 is not in use
   - Check Docker logs: `docker logs n8n`

2. If webhooks are not working:
   - Verify your ngrok URL is correct
   - Ensure ngrok is running
   - Check if the WEBHOOK_URL environment variable is set correctly

## Additional Resources
- [n8n Documentation](https://docs.n8n.io/)
- [Docker Documentation](https://docs.docker.com/)
- [ngrok Documentation](https://ngrok.com/docs)