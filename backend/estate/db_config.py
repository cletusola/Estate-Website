from dotenv import load_dotenv
from pathlib import Path
import os 



BASE_DIR = Path(__file__).resolve().parent.parent

load_dotenv(os.path.join(BASE_DIR, 'estate/.env'))

# Database

DATABASES = {
    'default': {
        'ENGINE': os.getenv('DB_TYPE'),
        'NAME':os.getenv('DB_NAME'),
        'USER':os.getenv('DB_USER'),
        'PASSWORD':os.getenv('DB_PASS'),
        'HOST':os.getenv('DB_HOST'),
        'PORT':os.getenv('DB_PORT')
    }
}
