FROM ghcr.io/tbscode/tims-packages/alpine-django-python:latest as backend

WORKDIR /hal

ENV PIP_ROOT_USER_ACTION=ignore

COPY ./requirements.txt /tmp/requirements.txt
RUN pip install --no-cache-dir -r /tmp/requirements.txt
RUN pip cache purge

COPY . .

EXPOSE 8000
EXPOSE 5555

CMD ["sh", "spinup.sh"]