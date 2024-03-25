python3 manage.py migrate
python3 manage.py shell --command 'from core.tools import before_backend_startup; before_backend_startup()'

if [ $PRODUCTION = "true" ]; then
    SINGLE_BEAT_REDIS_SERVER="$REDIS_URL" single-beat celery -A back beat --loglevel=info &
fi

uvicorn conf.asgi:application --reload --port 8000 --host 0.0.0.0
