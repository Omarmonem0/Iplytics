import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("patents", 
    (table) => {
        table.string("title", 512).notNullable();
        table.date("publication_date").notNullable();
        table.uuid("publication_number").unique().primary()
        table.index("title")
    })
}


export async function down(knex: Knex): Promise<void> {
}

