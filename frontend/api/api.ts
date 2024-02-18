/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface ChatResult {
  /** @format date-time */
  created: string;
  newest_message: Message;
  partner: UserProfile;
  unread_count: number;
  /** @format uuid */
  uuid: string;
}

export interface ChatsListParams {
  /** A page number within the paginated result set. */
  page?: number;
  /** Number of results to return per page. */
  page_size?: number;
}

export interface LoginInfo {
  password: string;
  username: string;
}

export interface Message {
  /** @format date-time */
  created: string;
  read?: boolean;
  /** @format uuid */
  sender: string;
  text: string;
  /** @format uuid */
  uuid: string;
}

export interface MessagesList2Params {
  chatUuid: string;
  /** A page number within the paginated result set. */
  page?: number;
  /** Number of results to return per page. */
  page_size?: number;
}

export interface MessagesListParams {
  /** A page number within the paginated result set. */
  page?: number;
  /** Number of results to return per page. */
  page_size?: number;
}

export interface PaginatedChatResultList {
  /**
   * The first page number
   * @format int32
   * @example "1"
   */
  first_page?: number;
  /**
   * The total number of items
   * @format int32
   * @example "1"
   */
  items_total?: number;
  /**
   * The next page number
   * @format int32
   * @example "2"
   */
  next_page?: number;
  /**
   * The number of items per page
   * @format int32
   * @example "40"
   */
  page_size?: number;
  /**
   * The total number of pages
   * @format int32
   * @example "1"
   */
  pages_total?: number;
  /**
   * The previous page number
   * @format int32
   * @example "1"
   */
  previous_page?: number;
  results?: ChatResult[];
}

export interface PaginatedMessageList {
  /**
   * The first page number
   * @format int32
   * @example "1"
   */
  first_page?: number;
  /**
   * The total number of items
   * @format int32
   * @example "1"
   */
  items_total?: number;
  /**
   * The next page number
   * @format int32
   * @example "2"
   */
  next_page?: number;
  /**
   * The number of items per page
   * @format int32
   * @example "40"
   */
  page_size?: number;
  /**
   * The total number of pages
   * @format int32
   * @example "1"
   */
  pages_total?: number;
  /**
   * The previous page number
   * @format int32
   * @example "1"
   */
  previous_page?: number;
  results?: Message[];
}

export interface PaginatedUserProfileList {
  /** @example 123 */
  count?: number;
  /**
   * @format uri
   * @example "http://api.example.org/accounts/?page=4"
   */
  next?: string | null;
  /**
   * @format uri
   * @example "http://api.example.org/accounts/?page=2"
   */
  previous?: string | null;
  results?: UserProfile[];
}

export interface PatchedMessage {
  /** @format date-time */
  created?: string;
  read?: boolean;
  /** @format uuid */
  sender?: string;
  text?: string;
  /** @format uuid */
  uuid?: string;
}

export interface PatchedUserProfile {
  /** @maxLength 50 */
  first_name?: string;
  /** @format date-time */
  last_updated?: string;
  /** @maxLength 50 */
  second_name?: string;
}

export interface Person {
  /** @format email */
  email: string;
  password: string;
  password_confirm: string;
}

export interface ProfilesListParams {
  /** A page number within the paginated result set. */
  page?: number;
  /** Number of results to return per page. */
  page_size?: number;
}

export interface RegisterResponseSuccess {
  message: string;
  user_hash: string;
}

export interface SendMessage {
  text: string;
}

export interface UserProfile {
  /** @maxLength 50 */
  first_name: string;
  /** @format date-time */
  last_updated: string;
  /** @maxLength 50 */
  second_name: string;
}

export interface UserSelf {
  automated?: boolean;
  /** @format date-time */
  date_joined?: string;
  /**
   * Email address
   * @format email
   * @maxLength 254
   */
  email?: string;
  id: number;
  /**
   * Staff status
   * Designates whether the user can log into this admin site.
   */
  is_staff?: boolean;
  /**
   * Superuser status
   * Designates that this user has all permissions without explicitly assigning them.
   */
  is_superuser?: boolean;
  /** @format date-time */
  last_login?: string | null;
  /** @format uuid */
  uuid: string;
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (securityData: SecurityDataType | null) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) => fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter((key) => "undefined" !== typeof query[key]);
    return keys
      .map((key) => (Array.isArray(query[key]) ? this.addArrayQueryParam(query, key) : this.addQueryParam(query, key)))
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string") ? JSON.stringify(input) : input,
    [ContentType.Text]: (input: any) => (input !== null && typeof input !== "string" ? JSON.stringify(input) : input),
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
            ? JSON.stringify(property)
            : `${property}`,
        );
        return formData;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (cancelToken: CancelToken): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<T> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(`${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`, {
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
      },
      signal: (cancelToken ? this.createAbortSignal(cancelToken) : requestParams.signal) || null,
      body: typeof body === "undefined" || body === null ? null : payloadFormatter(body),
    }).then(async (response) => {
      const r = response as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data.data;
    });
  };
}

/**
 * @title API docs
 * @version 1.0.0
 *
 * API docs
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  api = {
    /**
     * @description Simple Viewset for modifying user profiles
     *
     * @tags chats
     * @name ChatsList
     * @request GET:/api/chats/
     * @secure
     */
    chatsList: (query: ChatsListParams, params: RequestParams = {}) =>
      this.request<PaginatedChatResultList, any>({
        path: `/api/chats/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Simple Viewset for modifying user profiles
     *
     * @tags chats
     * @name ChatsRetrieve
     * @request GET:/api/chats/{chat_uuid}/
     * @secure
     */
    chatsRetrieve: (chatUuid: string, params: RequestParams = {}) =>
      this.request<ChatResult, any>({
        path: `/api/chats/${chatUuid}/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags login
     * @name LoginCreate
     * @request POST:/api/login
     * @secure
     */
    loginCreate: (data: LoginInfo, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/login`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Simple Viewset messages CREATE, LIST, UPDATE, DELETE
     *
     * @tags messages
     * @name MessagesList
     * @request GET:/api/messages/
     * @secure
     */
    messagesList: (query: MessagesListParams, params: RequestParams = {}) =>
      this.request<PaginatedMessageList, any>({
        path: `/api/messages/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Simple Viewset messages CREATE, LIST, UPDATE, DELETE
     *
     * @tags messages
     * @name MessagesList2
     * @request GET:/api/messages/{chat_uuid}/
     * @secure
     */
    messagesList2: ({ chatUuid, ...query }: MessagesList2Params, params: RequestParams = {}) =>
      this.request<PaginatedMessageList, any>({
        path: `/api/messages/${chatUuid}/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Simple Viewset messages CREATE, LIST, UPDATE, DELETE
     *
     * @tags messages
     * @name MessagesPartialUpdate
     * @request PATCH:/api/messages/{id}/
     * @secure
     */
    messagesPartialUpdate: (id: string, data: PatchedMessage, params: RequestParams = {}) =>
      this.request<Message, any>({
        path: `/api/messages/${id}/`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Simple Viewset messages CREATE, LIST, UPDATE, DELETE
     *
     * @tags messages
     * @name MessagesReadCreate
     * @request POST:/api/messages/{id}/read/
     * @secure
     */
    messagesReadCreate: (id: string, data: SendMessage, params: RequestParams = {}) =>
      this.request<Message, any>({
        path: `/api/messages/${id}/read/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Simple Viewset messages CREATE, LIST, UPDATE, DELETE
     *
     * @tags messages
     * @name MessagesRetrieve
     * @request GET:/api/messages/{id}/
     * @secure
     */
    messagesRetrieve: (id: string, params: RequestParams = {}) =>
      this.request<Message, any>({
        path: `/api/messages/${id}/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Simple Viewset messages CREATE, LIST, UPDATE, DELETE
     *
     * @tags messages
     * @name MessagesSendCreate
     * @request POST:/api/messages/{chat_uuid}/send/
     * @secure
     */
    messagesSendCreate: (chatUuid: string, data: SendMessage, params: RequestParams = {}) =>
      this.request<Message, any>({
        path: `/api/messages/${chatUuid}/send/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Simple Viewset messages CREATE, LIST, UPDATE, DELETE
     *
     * @tags messages
     * @name MessagesUpdate
     * @request PUT:/api/messages/{id}/
     * @secure
     */
    messagesUpdate: (id: string, data: Message, params: RequestParams = {}) =>
      this.request<Message, any>({
        path: `/api/messages/${id}/`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Simple Viewset for modifying user profiles
     *
     * @tags profile
     * @name ProfilePartialUpdate
     * @request PATCH:/api/profile
     * @secure
     */
    profilePartialUpdate: (data: PatchedUserProfile, params: RequestParams = {}) =>
      this.request<UserProfile, any>({
        path: `/api/profile`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Simple Viewset for modifying user profiles
     *
     * @tags profile
     * @name ProfileRetrieve
     * @request GET:/api/profile
     * @secure
     */
    profileRetrieve: (params: RequestParams = {}) =>
      this.request<UserProfile, any>({
        path: `/api/profile`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Simple Viewset for modifying user profiles
     *
     * @tags profiles
     * @name ProfilesList
     * @request GET:/api/profiles/
     * @secure
     */
    profilesList: (query: ProfilesListParams, params: RequestParams = {}) =>
      this.request<PaginatedUserProfileList, any>({
        path: `/api/profiles/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Simple Viewset for modifying user profiles
     *
     * @tags profiles
     * @name ProfilesPartialUpdate
     * @request PATCH:/api/profiles/{id}/
     * @secure
     */
    profilesPartialUpdate: (id: string, data: PatchedUserProfile, params: RequestParams = {}) =>
      this.request<UserProfile, any>({
        path: `/api/profiles/${id}/`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Simple Viewset for modifying user profiles
     *
     * @tags profiles
     * @name ProfilesRetrieve
     * @request GET:/api/profiles/{id}/
     * @secure
     */
    profilesRetrieve: (id: string, params: RequestParams = {}) =>
      this.request<UserProfile, any>({
        path: `/api/profiles/${id}/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Simple Viewset for modifying user profiles
     *
     * @tags profiles
     * @name ProfilesUpdate
     * @request PUT:/api/profiles/{id}/
     * @secure
     */
    profilesUpdate: (id: string, data: UserProfile, params: RequestParams = {}) =>
      this.request<UserProfile, any>({
        path: `/api/profiles/${id}/`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Simple Viewset for modifying user profiles
     *
     * @tags profile
     * @name ProfileUpdate
     * @request PUT:/api/profile
     * @secure
     */
    profileUpdate: (data: UserProfile, params: RequestParams = {}) =>
      this.request<UserProfile, any>({
        path: `/api/profile`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags register
     * @name RegisterCreate
     * @request POST:/api/register
     * @secure
     */
    registerCreate: (data: Person, params: RequestParams = {}) =>
      this.request<RegisterResponseSuccess, any>({
        path: `/api/register`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Simple Viewset for modifying user profiles
     *
     * @tags user
     * @name UserRetrieve
     * @request GET:/api/user
     * @secure
     */
    userRetrieve: (params: RequestParams = {}) =>
      this.request<UserSelf, any>({
        path: `/api/user`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),
  };
}
