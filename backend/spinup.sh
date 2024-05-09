python3 manage.py migrate --noinput
python3 manage.py collectstatic --noinput
python3 manage.py shell --command 'from core.tools import before_backend_startup; before_backend_startup()'

if [ $CREATE_TEST_USERS = "true" ]; then
    python3 manage.py shell --command 'from core.default_user_setup import create_or_reset_test_users; create_or_reset_test_users(4)'
fi

if [ $PRODUCTION = "true" ]; then
    SINGLE_BEAT_REDIS_SERVER="$REDIS_URL" single-beat celery -A back beat --loglevel=info &
fi

uvicorn conf.asgi:application --reload --port 8000 --host 0.0.0.0
