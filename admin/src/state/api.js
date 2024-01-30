import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: localStorage.getItem('baseUrl'),
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      headers.set('authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  reducerPath: 'adminApi',
  tagTypes: [
    'User',
    'Products',
    'Customers',
    'UserRooms',
    'AccessLinks',
    'SingleCustomer',
    'SingleRide',
    'SharedRides',
    'RapidRides',
    'LiveRides',
    'SharedPendingRides',
    'RapidPendingRides',
    'Transactions',
    'Geography',
    'Sales',
    'Admins',
    'Performance',
    'Discount',
    'Dashboard',
    'TopUp',
    'SingleTopUp',
    'Reports',
    'SingleReport',
  ],
  endpoints: (build) => ({
    getUser: build.query({
      query: (id) => `admin/users/${id}`,
      providesTags: ['User'],
    }),
    getProducts: build.query({
      query: () => 'client/products',
      providesTags: ['Products'],
    }),
    getCustomers: build.query({
      query: () => `admin/users`,
      providesTags: ['Customers'],
    }),
    getUserRooms: build.query({
      query: () => `admin/user-rooms`,
      providesTags: ['UserRooms'],
    }),
    getAccessLinks: build.query({
      query: () => `admin/access-links`,
      providesTags: ['AccessLinks'],
    }),
    getSingleCustomer: build.query({
      query: (id) => `admin/users/${id}`,
      providesTags: ['SingleCustomer'],
    }),
    getSingleRide: build.query({
      query: ({ id, type }) => {
        return {
          url: type === 'sharedExpress' ? `admin/shared-rides/${id}` : `admin/rapid-rides/${id}`,
          method: 'GET',
        };
      },
      providesTags: ['SingleRide'],
    }),
    getSharedRides: build.query({
      query: ({ page = 0, pageSize = 0, sort = 0, search = 'a' }) => `admin/shared-rides`,
      providesTags: ['SharedRides'],
    }),
    getRapidRides: build.query({
      query: ({ page = 0, pageSize = 0, sort = 0, search = 'a' }) => `admin/rapid-rides`,
      providesTags: ['RapidRides'],
    }),
    getLiveRides: build.query({
      query: () => `admin/active-rides`,
      providesTags: ['LiveRides'],
    }),
    getSharedPendingRides: build.query({
      query: () => `admin/shared-rides/ride-requests?status=waiting`,
      providesTags: ['SharedPendingRides'],
    }),
    getRapidPendingRides: build.query({
      query: () => `admin/rapid-rides/ride-requests?status=waiting`,
      providesTags: ['RapidPendingRides'],
    }),
    getTransactions: build.query({
      query: ({ page, pageSize, sort, search }) => ({
        url: 'admin/fares',
        method: 'GET',
        // params: { page, pageSize, sort, search },
      }),
      providesTags: ['Transactions'],
    }),
    getGeography: build.query({
      query: () => 'client/geography',
      providesTags: ['Geography'],
    }),
    getSales: build.query({
      query: () => 'sales/sales',
      providesTags: ['Sales'],
    }),
    getAdmins: build.query({
      query: () => 'management/admins',
      providesTags: ['Admins'],
    }),
    getUserPerformance: build.query({
      query: (id) => `management/performance/${id}`,
      providesTags: ['Performance'],
    }),
    getDiscount: build.query({
      query: () => `admin/discount-codes`,
      providesTags: ['Discount'],
    }),
    getDashboard: build.query({
      query: () => 'general/dashboard',
      providesTags: ['Dashboard'],
    }),
    getTopUp: build.query({
      query: () => 'admin/topups',
      providesTags: ['TopUp'],
    }),
    getSingleTopUp: build.query({
      query: (id) => `admin/topups/${id}`,
      providesTags: ['SingleTopUp'],
    }),
    getReports: build.query({
      query: () => 'admin/report-tickets',
      providesTags: ['Reports'],
    }),
    getSingleReport: build.query({
      query: (id) => `admin/report-tickets/${id}`,
      providesTags: ['SingleReport'],
    }),

    getAllDocumentsByUserId: build.query({
      query: (id) => `admin/documents?userId=${id}`,
      providesTags: ['Documents', 'SingleCustomer'],
    }),

    updateDocument: build.mutation({
      query: ({ formData }) => ({
        url: `admin/documents/status`,
        method: 'PATCH',
        body: formData,
      }),
      invalidatesTags: ['Documents', 'SingleCustomer'],
    })
  }),
});

export const {
  useGetUserQuery,
  useGetProductsQuery,
  useGetCustomersQuery,
  useGetUserRoomsQuery,
  useGetAccessLinksQuery,
  useGetSingleCustomerQuery,
  useGetSingleRideQuery,
  useGetSharedRidesQuery,
  useGetRapidRidesQuery,
  useGetLiveRidesQuery,
  useGetSharedPendingRidesQuery,
  useGetRapidPendingRidesQuery,
  useGetTransactionsQuery,
  useGetGeographyQuery,
  useGetSalesQuery,
  useGetAdminsQuery,
  useGetUserPerformanceQuery,
  useGetDiscountQuery,
  useGetDashboardQuery,
  useGetTopUpQuery,
  useGetSingleTopUpQuery,
  useGetAllDocumentsByUserIdQuery,
  useGetReportsQuery,
  useGetSingleReportQuery,
  useUpdateDocumentMutation
} = api;
