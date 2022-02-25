const {Pool} = require('pg');
const { nanoid } = require('nanoid')

class PublisherService {

    constructor() {
        this.db = new Pool();
    }

    async getPublishers() {
        try {
            return (await this.db.query('SELECT * FROM Publisher')).rows;
        } catch (err) {
            throw err;
        }
    }

   

    // async getBookById(id) {
    //     try {
    //         const book = (await this.db.query(`SELECT * FROM book WHERE id=$1`, [id]));

    //         if (!book.rowCount) {
    //             throw new RangeError(`book with id ${id} not found`)
    //         }
    //         return book.rows[0]

    //     } catch (err) {
    //         throw err;
    //     } 
    // }


    

    async addPublisher({name, city}) {

  
        const id = `PUB-${nanoid(5)}`;  
        const createdAt = new Date().toLocaleString("id-ID");;
        const updatedAt = createdAt;

        const query = {
            text: 'INSERT INTO Publisher (publisher_id, name, city, created_at, updated_at) VALUES ($1, $2, $3, $4, $5) RETURNING publisher_id',
            values: [id, name, city, createdAt, updatedAt]
        }

        try {
            console.info(`values: ${query.values}`)
            const result = await this.db.query(query);

            console.info('Row Count ', result.rowCount);

            if (!result.rowCount) {
                throw new Error('Add new note failure')
            }
    
            return result.rows[0].publisher_id;
            
        } catch (err) {
            throw err;
        } 

        
    }



    async updateBookById(id, {title, authors, isbn, pages, year}) {
        
        const updatedAt = new Date().toLocaleString("id-ID");
        const query = {
            text: 'UPDATE book SET title=$1, authors=$2, isbn=$3, pages=$4, year=$5, updated_at=$6 WHERE id=$7 RETURNING *',
            values: [title, authors, isbn, pages, year, updatedAt, id]
        }

        try {
            
            const result = await this.db.query(query);
          
            if (!result.rows[0]) {
                throw new Error('Add new note failure')
            }

            return result.rows[0];
            
        } catch (err) {
            console.info(`err.stack :${err.stack}`);
        } 

        

    }



    async deleteBookById(id) {
        
        const query = {
            text: 'DELETE FROM book WHERE id=$1 RETURNING *',
            values: [id]
        }

        try {
            
            const r = await this.db.query(query);

            console.info(r.rows[0])

            if (!r.rows[0]) {
                throw new Error('book deleted book on query')
            }
    
            return r.rows[0];
            
        } catch (err) {
            throw err;
        } 

        

    }

    
}




module.exports = PublisherService;