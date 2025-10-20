import {
  mockCreators,
  mockPerks,
  mockComments,
  mockUsers,
  mockFollows,
  mockUserKeys,
  mockVideos,
} from '../data/mockData';
import type { Creator, Perk, Comment, User, Follow, UserKeys, CreatorVideo } from './supabase';

type QueryResponse<T> = {
  data: T | null;
  error: Error | null;
};

type QueryBuilder<T> = {
  select: (columns?: string) => QueryBuilder<T>;
  eq: (column: string, value: any) => QueryBuilder<T>;
  insert: (values: any) => QueryBuilder<T>;
  update: (values: any) => QueryBuilder<T>;
  delete: () => QueryBuilder<T>;
  order: (column: string, options?: { ascending?: boolean }) => QueryBuilder<T>;
  limit: (count: number) => QueryBuilder<T>;
  single: () => Promise<QueryResponse<T>>;
  maybeSingle: () => Promise<QueryResponse<T>>;
  then: (resolve: (value: QueryResponse<T[]>) => void) => Promise<QueryResponse<T[]>>;
};

class MockQueryBuilder<T> implements QueryBuilder<T> {
  private table: string;
  private filters: Array<{ column: string; value: any }> = [];
  private orderColumn?: string;
  private orderAsc: boolean = true;
  private limitCount?: number;
  private isSingleQuery: boolean = false;
  private operation: 'select' | 'insert' | 'update' | 'delete' = 'select';
  private updateValues?: any;
  private insertValues?: any;

  constructor(table: string) {
    this.table = table;
  }

  select(columns?: string): QueryBuilder<T> {
    this.operation = 'select';
    return this;
  }

  eq(column: string, value: any): QueryBuilder<T> {
    this.filters.push({ column, value });
    return this;
  }

  insert(values: any): QueryBuilder<T> {
    this.operation = 'insert';
    this.insertValues = values;
    return this;
  }

  update(values: any): QueryBuilder<T> {
    this.operation = 'update';
    this.updateValues = values;
    return this;
  }

  delete(): QueryBuilder<T> {
    this.operation = 'delete';
    return this;
  }

  order(column: string, options?: { ascending?: boolean }): QueryBuilder<T> {
    this.orderColumn = column;
    this.orderAsc = options?.ascending ?? true;
    return this;
  }

  limit(count: number): QueryBuilder<T> {
    this.limitCount = count;
    return this;
  }

  single(): Promise<QueryResponse<T>> {
    this.isSingleQuery = true;
    return this.execute() as Promise<QueryResponse<T>>;
  }

  maybeSingle(): Promise<QueryResponse<T>> {
    this.isSingleQuery = true;
    return this.execute() as Promise<QueryResponse<T>>;
  }

  then(resolve: (value: QueryResponse<T[]>) => void): Promise<QueryResponse<T[]>> {
    return this.execute().then(resolve);
  }

  private getData(): any[] {
    switch (this.table) {
      case 'creators':
        return mockCreators;
      case 'perks':
        return mockPerks;
      case 'comments':
        return mockComments;
      case 'users':
        return mockUsers;
      case 'follows':
        return mockFollows;
      case 'user_keys':
        return mockUserKeys;
      case 'creator_videos':
        return mockVideos;
      case 'creator_applications':
        return [];
      default:
        return [];
    }
  }

  private async execute(): Promise<QueryResponse<any>> {
    await new Promise(resolve => setTimeout(resolve, 100));

    if (this.operation === 'insert') {
      console.log(`Mock insert into ${this.table}:`, this.insertValues);
      return { data: this.insertValues, error: null };
    }

    if (this.operation === 'update') {
      console.log(`Mock update in ${this.table}:`, this.updateValues, 'with filters:', this.filters);
      return { data: this.updateValues, error: null };
    }

    if (this.operation === 'delete') {
      console.log(`Mock delete from ${this.table} with filters:`, this.filters);
      return { data: null, error: null };
    }

    let data = this.getData();

    this.filters.forEach(filter => {
      data = data.filter((item: any) => item[filter.column] === filter.value);
    });

    if (this.orderColumn) {
      data.sort((a: any, b: any) => {
        const aVal = a[this.orderColumn!];
        const bVal = b[this.orderColumn!];
        if (aVal < bVal) return this.orderAsc ? -1 : 1;
        if (aVal > bVal) return this.orderAsc ? 1 : -1;
        return 0;
      });
    }

    if (this.limitCount !== undefined) {
      data = data.slice(0, this.limitCount);
    }

    if (this.isSingleQuery) {
      return { data: data[0] || null, error: null };
    }

    return { data, error: null };
  }
}

export const createMockSupabaseClient = () => {
  return {
    from: <T = any>(table: string): QueryBuilder<T> => {
      return new MockQueryBuilder<T>(table);
    },
    auth: {
      getSession: async () => ({ data: { session: null }, error: null }),
      signUp: async () => ({ data: null, error: null }),
      signInWithPassword: async () => ({ data: null, error: null }),
      signOut: async () => ({ error: null }),
      onAuthStateChange: () => ({
        data: { subscription: { unsubscribe: () => {} } },
      }),
    },
  };
};
