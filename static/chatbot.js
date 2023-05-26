<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="{{ url_for('static', filename='css/styles.css') }}">
    <title>Chatbot</title>
</head>
<body>
    <div id="chat-container">
        <button id="chatbot-button" onclick="toggleChatbot()">Chat</button>
        <div id="chatbot-widget">
            <!-- Chatbot content goes here -->
        </div>
    </div>

    <div id="inquiry-container">
        <div id="chat-log"></div>
        <input type="text" id="user-input" placeholder="Type your message">
        <button id="send-button" onclick="sendInquiry()">Send</button>
    </div>

    <script src="{{ url_for('static', filename='chatbot.js') }}"></script>
    <script>
        function sendInquiry() {
            var userInput = document.getElementById('user-input').value;
            var chatLog = document.getElementById('chat-log');
            var request = new XMLHttpRequest();
            request.open('POST', '/inquiry');
            request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            request.onload = function() {
                if (request.status === 200) {
                    var reply = request.responseText;
                    var userMessage = '<div class="user-message">' + userInput + '</div>';
                    var botMessage = '<div class="bot-message">' + reply + '</div>';
                    chatLog.innerHTML += userMessage + botMessage;
                    document.getElementById('user-input').value = '';

                    // Store inquiry and reply in the database
                    var inquiry = userInput;
                    var answer = reply;
                    var dbRequest = new XMLHttpRequest();
                    dbRequest.open('POST', '/store_inquiry');
                    dbRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                    dbRequest.send('inquiry=' + encodeURIComponent(inquiry) + '&answer=' + encodeURIComponent(answer));
                }
            };
            request.send('message=' + userInput);
        }

        function toggleChatbot() {
            var chatbotWidget = document.getElementById('chatbot-widget');
            chatbotWidget.classList.toggle('open');
        }
    </script>
</body>
</html>
