🔐 ACID Properties – For Transactions
Think of a transaction like a group of steps that must happen together — like sending money from one bank account to another.

1. A – Atomicity
"All or nothing"

If you send money:

Step 1: Subtract ₹100 from your account

Step 2: Add ₹100 to your friend's account
👉 If any step fails, the whole transaction is canceled.

2. C – Consistency
"Always valid"

The database follows rules (e.g., no negative balance).
After the transaction, the data must still be correct and follow the rules.

3. I – Isolation
"No interference"

If 2 people are transferring money at the same time,
their transactions won’t mix — each one works as if it’s alone.

4. D – Durability
"It stays saved"

Once the transaction is done and says “✅ Success”,
it stays that way — even if power goes out, the data is safe.

DRAWBACK OF ACID
| Property        | Drawback                                                                                                      |
| --------------- | ------------------------------------------------------------------------------------------------------------- |
| **Atomicity**   | If one small step fails, the whole process rolls back – can make systems slower in high-load situations.      |
| **Consistency** | Enforcing strict rules may cause failures if data doesn’t exactly follow the rules (even for small mistakes). |
| **Isolation**   | If many users access the same data at once, the DB might make them wait — this can **slow down performance**. |
| **Durability**  | Requires logs and backups to save everything, which can take **extra disk space and memory**.                 |


👁️ Views – Like a Shortcut Table
A View is like a virtual table that shows you filtered or simplified data without duplicating it.

🔸 Example: You have a students table with lots of columns (name, age, marks, email, phone, etc.)

You want to show only name and marks to teachers:

sql
Copy
Edit
CREATE VIEW MarksView AS
SELECT name, marks FROM students;
Now you can just run:

sql
Copy
Edit
SELECT * FROM MarksView;
✅ Benefit: Teachers won’t see emails or phone numbers
✅ Also useful for complex queries – you save them as a view!

DRAWBACK OF VIEWS
| Problem                        | Explanation                                                                                                                          |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------ |
| ❌ Not real data                | Views are **virtual** — they **do not store data**. So if the original table changes, view reflects it — good, but can be confusing. |
| ⚠️ Performance                  | If your view is based on **complex joins**, it can be **slow**, especially if used frequently.                                       |
| ⛔ Not always updatable         | Some views **can’t be updated**, especially if they include `GROUP BY`, `JOIN`, or `DISTINCT`.                                       |
| 📦 Storage (Materialized Views) | If you want a view that stores actual data (called **materialized view**), it takes **extra space** and needs refreshing.            |



⚡ Indexing – Like a Book Index
Imagine finding a word in a big book:

Without an index: You flip every page 😩

With an index: You jump straight to the page ✅

Same with databases!

Without index:
sql
Copy
Edit
SELECT * FROM users WHERE email = 'abc@example.com';
It checks every row – slow if table is huge.

With index:
sql
Copy
Edit
CREATE INDEX idx_email ON users(email);
It jumps directly to the row – much faster.

✅ Speeds up searches
⚠️ Takes extra space and slows down insert/update/delete a bit

DRAWBACK OF INDEXING
| Problem                      | Explanation                                                                                                                               |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| 📉 Slower writes              | When you **insert**, **update**, or **delete** rows, the database also needs to update the index — so these operations become **slower**. |
| 🧠 Over-indexing              | Adding **too many indexes** slows down the whole database and uses more memory and storage.                                               |
| ❌ Not useful for all queries | Some queries (like searching within JSON or large text fields) may **not benefit** from indexes.                                          |
| 💾 Extra storage              | Indexes are like separate data structures, so they **take up disk space**.                                                                |