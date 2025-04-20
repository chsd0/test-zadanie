import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export type Groups = GroupInt[];

export interface GroupInt {
    id: number,
    caption: string,
    nodes: NodeInt[]
}

export interface NodeInt {
    id: number,
    caption: string,
    status: Status,
    interface: Interface,
    admin: Admin,
    utilization?: Utilization,
    application: string
}

interface Status {
    color: string,
    description: string
}

interface Interface {
    caption: string,
    status: Status
}

interface Admin {
    email: string,
    firstname: string,
    lastname: string,
}
export type MetricsInt = Metric[];

export interface Metric {
    id: number,
    datetime: string,
    utilization: Utilization,
    node: MetricNode
}

export interface Utilization {
    cpu: number,
    memory: number,
    disc: number
}

interface MetricNode {
    id: number,
    caption: string,
}

export const apiSlice = createApi({
  // Ключ для хранилища Redux
  reducerPath: 'api',
  
  // Базовый URL для всех запросов
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'http://localhost:23456/api',
  }),

  tagTypes: ['Groups', 'MetricsInt'],
  
  // Определение endpoints (запросы и мутации)
  endpoints: builder => ({
    // GET запрос 
    getGroups: builder.query<Groups, undefined>({
      query: () => '/groups',
      providesTags: ['Groups']
    }),
    
    getMetrics: builder.query<MetricsInt, undefined>({
        query: () => '/metrics',
        providesTags: ['MetricsInt']
    }),
  })
})

// Экспорт хуков для использования в компонентах
export const { 
  useGetGroupsQuery, 
  useGetMetricsQuery 
} = apiSlice