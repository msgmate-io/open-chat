import os
from pathlib import Path
import sys
BASE_ADMIN_USERNAME = os.environ.get("BASE_ADMIN_USERNAME", "admin")
BASE_ADMIN_USER_PASSWORD = os.environ.get(
    "BASE_ADMIN_USER_PASSWORD", "password")
DEBUG = os.environ.get("DJANGO_DEBUG", "true").lower() in ('true', '1', 't')
IGNORABLE_404_URLS = [r'^favicon\.ico$']
ROOT_URLCONF = 'conf.urls'
BASE_DIR = Path(__file__).resolve().parent.parent
DEFAULT_AUTO_FIELD = 'django.db.models.AutoField'
INSTALLED_APPS = [
    'jazzmin',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'django_nextjs.apps.DjangoNextJSConfig',
    'drf_spectacular',
    'drf_spectacular_sidecar',
    'rest_framework.authtoken',
    'corsheaders',
    'core',
    'chat',
    #'ddrr',
    'django_prometheus'
]
MIDDLEWARE = [
        "ddrr.middleware.DebugRequestsResponses",
    'django_prometheus.middleware.PrometheusBeforeMiddleware',
    'django.middleware.security.SecurityMiddleware',
    "whitenoise.middleware.WhiteNoiseMiddleware",
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    "corsheaders.middleware.CorsMiddleware",
    'django_prometheus.middleware.PrometheusAfterMiddleware',
]
AUTH_USER_MODEL = 'core.User'
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": "db.sqlite3",
    }
}

GOOGLE_API_KEY = os.environ.get(
    "GOOGLE_API_KEY", "")

GOOGLE_APP_CSE_ID = os.environ.get("GOOGLE_APP_CSE_ID", "")

OPENAI_KEY = os.environ.get(
    "OPENAI_KEY", "")


if DEBUG:
    CSRF_TRUSTED_ORIGINS = ["https://t1m.me", "http://host.docker.internal:8000", "http://localhost:80", "http://localhost:80"]
else:
    CSRF_TRUSTED_ORIGINS = []

if os.environ.get("ROOT_HOST", "") != "":
    CSRF_TRUSTED_ORIGINS.append("https://*." + os.environ.get("ROOT_HOST", ""))
    CSRF_TRUSTED_ORIGINS.append("https://" + os.environ.get("ROOT_HOST", ""))
    
if os.environ.get("EXTRA_TRUSTED_ORIGINS", "") != "":
    EXTRA_HOSTS = os.environ.get("EXTRA_TRUSTED_ORIGINS", "").split(",")
    CSRF_TRUSTED_ORIGINS += EXTRA_HOSTS

DB_ENGINE = os.environ.get("DB_ENGINE", "django_prometheus.db.backends.sqlite3")
DATABASES = {
    'default': {
        'ENGINE': DB_ENGINE,
        'NAME': BASE_DIR / 'db.sqlite3',
        **({
            'NAME': os.environ['DB_NAME'],
            'USER': os.environ['DB_USER'],
            'PASSWORD': os.environ['DB_PASSWORD'],
            'HOST': os.environ['DB_HOST'],
            'PORT': os.environ['DB_PORT'],
            **{'OPTIONS': {'sslmode': 'require'} if (not (os.environ.get("DB_NO_SSL", "false") == "true")) else {}}
        } if 'postgresql' in os.environ.get("DB_ENGINE", "") else {})
    }
}

REST_FRAMEWORK = {
    'DEFAULT_THROTTLE_CLASSES': [
        'rest_framework.throttling.AnonRateThrottle',
        'rest_framework.throttling.UserRateThrottle'
    ],
    'DEFAULT_THROTTLE_RATES': {
        'anon': '1000/day',
        'user': '2000/day'
    },
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 50
}

if os.environ.get("DJANGO_SECRET_KEY", "") != "":
    SESSION_COOKIE_DOMAIN = os.environ.get("SESSION_COOKIE_DOMAIN", "")

if DEBUG:
    LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
        'verbose': {
            'format': '{levelname} {asctime} {module} {message}',
            'style': '{',
        },
    },
    'handlers': {
        'console': {
            'class': 'logging.StreamHandler',
            'formatter': 'verbose',
        },
    },
    'loggers': {
        'django': {
            'handlers': ['console'],
            'level': 'DEBUG',
        },
        'rest_framework': {
            'handlers': ['console'],
            'level': 'DEBUG',
        },
        'management': {
            'handlers': ['console'],
            'level': 'DEBUG',
        },
    },
    } if False else {}
    CORS_ORIGIN_ALLOW_ALL = True

    CORS_ALLOW_CREDENTIALS = True
    
    CSRF_TRUSTED_ORIGINS += ["http://localhost","http://localhost:3000", "http://localhost:8000", "https://6191-134-61-83-151.ngrok-free.app", "http://10.0.2.2"]

    SESSION_COOKIE_SECURE= False #default use just to override your prod setting
    SESSION_COOKIE_DOMAIN= None  #default  use just to override your prod setting

    CORS_ALLOW_METHODS = [
        "DELETE",
        "GET",
        "OPTIONS",
        "PATCH",
        "POST",
        "PUT",
    ]
    CORS_ALLOW_HEADERS = [
        "accept",
        "accept-encoding",
        "authorization",
        "content-type",
        "dnt",
        "origin",
        "user-agent",
        "x-csrftoken",
        "x-requested-with",
    ]

REDIS_URL = os.environ.get(
    "REDIS_URL", "redis://host.docker.internal:6379")


REST_FRAMEWORK = {
    "DEFAULT_SCHEMA_CLASS": 'drf_spectacular.openapi.AutoSchema'
}

ALLOWED_HOSTS = os.environ.get("DJANGO_ALLOWED_HOSTS", "*").split(",")

SECRET_KEY = os.environ.get("DJANGO_SECRET_KEY", "secret-key")

USE_NEXTJS_PROXY_ROUTES = (os.environ.get(
    "USE_NEXTJS_PROXY_ROUTES", "true").lower() in ('true', '1', 't'))


STATIC_ROOT = "static/"
STATIC_URL = 'static/'

NEXTJS_HOST_URL = os.environ.get(
    "NEXTJS_HOST_URL", "http://host.docker.internal:3000")

NEXTJS_SETTINGS = {
    "nextjs_server_url": NEXTJS_HOST_URL
}

SESSION_EXPIRE_AT_BROWSER_CLOSE = True

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


SPECTACULAR_SETTINGS = {
    'TITLE': 'API docs',
    'DESCRIPTION': 'API docs',
    'EXTENSIONS_INFO': {},
    'VERSION': '1.0.0',
    'SERVE_INCLUDE_SCHEMA': False,
    'SERVE_PUBLIC': True,
    'SWAGGER_UI_DIST': 'SIDECAR',
    'SWAGGER_UI_FAVICON_HREF': 'SIDECAR',
    'REDOC_DIST': 'SIDECAR',
    'SERVE_INCLUDE_SCHEMA': False,
    "SWAGGER_UI_SETTINGS": {
        "deepLinking": False,
        "persistAuthorization": False,
        "displayOperationId": False,
    },
    # "PREPROCESSING_HOOKS": [""],
    # 'SERVE_PERMISSIONS': ['rest_framework.permissions.IsAuthenticated'],
    "REDOC_UI_SETTINGS": {
        "hideDownloadButton": True,
    },
}

LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True

JAZZMIN_SETTINGS = {
    "site_title": "Tiny Django",
    "site_header": "Tiny Django",
    "site_brand": "Tiny Django",
    "site_logo": "",
    "login_logo": None,
    "login_logo_dark": None,
    "site_logo_classes": "img-circle",
    "site_icon": None,
    "welcome_sign": "Waddup greetings fellow admin :)",
    "copyright": "Tim Schupp, Tim Benjamin Software UG",
    "search_model": ["auth.User", "auth.Group"],
    "user_avatar": None,
    "topmenu_links": [
        {"name": "Home",  "url": "/app",
            "permissions": ["auth.view_user"]},
    ],
    "usermenu_links": [
    ],
    "show_sidebar": True,
    "navigation_expanded": True,
    "hide_apps": [],
    "hide_models": [],
    "custom_links": {},
    "icons": {
        "auth": "fas fa-users-cog",
        "auth.user": "fas fa-user",
        "auth.Group": "fas fa-users",
    },
    "default_icon_children": "fas fa-circle",
    "related_modal_active": False,
    "custom_css": None,
    "custom_js": None,
    "use_google_fonts_cdn": True,  # TODO: we don't want his
    "show_ui_builder": False,
}

JAZZMIN_UI_TWEAKS = {
    "sidebar_nav_compact_style": True,
    "dark_mode_theme": "darkly",
}

CHANNEL_LAYERS = {
    "default": {
        # "BACKEND": "channels_redis.core.RedisChannelLayer",
        "BACKEND": "channels_redis.pubsub.RedisPubSubChannelLayer",
        # "BACKEND": "channels.layers.InMemoryChannelLayer",
        "CONFIG": {
            "hosts": [REDIS_URL],
        },
    }
}


import logging
DDRR = {
    "ENABLE_REQUESTS": True,  # enable request logging
    "ENABLE_RESPONSES": True,  # enable response logging
    "LEVEL": "DEBUG",  # ddrr log level
    "PRETTY_PRINT": False,  # pretty-print JSON and XML
    "REQUEST_TEMPLATE_NAME": "ddrr/default-request.html",  # request log template name
    "REQUEST_TEMPLATE": None,  # request log template string (overrides template name)
    "RESPONSE_TEMPLATE_NAME": "ddrr/default-response.html",  # response log template name
    "RESPONSE_TEMPLATE": None,  # response log template string (overrides template name)
    "REQUEST_HANDLER": logging.StreamHandler(),  # request log handler
    "RESPONSE_HANDLER": logging.StreamHandler(),  # response log handler
    "ENABLE_COLORS": True,  # enable colors if terminal supports it
    "LIMIT_BODY": None,  # limit request/response body output to X chars
    "DISABLE_DJANGO_SERVER_LOG": False,  # disable default django server log
}

