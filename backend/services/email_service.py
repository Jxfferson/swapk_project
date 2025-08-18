import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os
from dotenv import load_dotenv

load_dotenv()

#Archivo de prueba correspondiente a la funcionalidad de enviar correos para restablecer contraseña
async def send_password_reset_email(email: str, reset_token: str):
    """Envía email con enlace para resetear contraseña"""
    try:
        smtp_server = os.getenv('SMTP_SERVER', 'smtp.gmail.com')
        smtp_port = int(os.getenv('SMTP_PORT', 587))
        sender_email = os.getenv('EMAIL_FROM')
        email_password = os.getenv('EMAIL_PASSWORD')
        
        message = MIMEMultipart()
        message['From'] = sender_email
        message['To'] = email
        message['Subject'] = "Restablecimiento de contraseña"
        
        reset_link = f"http://swapk.com/reset-password?token={reset_token}"
        body = f"""
        <h2>Restablecer contraseña</h2>
        <p>Haz clic en el enlace para restablecer tu contraseña:</p>
        <a href="{reset_link}">Restablecer contraseña</a>
        """
        
        message.attach(MIMEText(body, "html"))
        
        with smtplib.SMTP(smtp_server, smtp_port) as server:
            server.starttls()
            server.login(sender_email, email_password)
            server.send_message(message)
            
        return True
    except Exception as e:
        print(f"Error enviando email: {e}")
        raise e