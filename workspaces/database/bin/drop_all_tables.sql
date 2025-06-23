do $$ 
declare
    r record;
    t record;
begin
    -- Drop all tables
    for r in (select tablename from pg_tables where schemaname = 'public') loop
        execute 'drop table if exists ' || quote_ident(r.tablename) || ' cascade';
    end loop;
    
    -- Drop all types
    for t in (select typname from pg_type where typnamespace = (select oid from pg_namespace where nspname = 'public') and typtype = 'e') loop
        execute 'drop type if exists ' || quote_ident(t.typname) || ' cascade';
    end loop;
end $$;