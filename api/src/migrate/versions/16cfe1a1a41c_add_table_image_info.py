"""'add_table_image_info'

Revision ID: 16cfe1a1a41c
Revises: c9cd6bb92dc1
Create Date: 2021-08-09 18:44:32.984085

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '16cfe1a1a41c'
down_revision = 'c9cd6bb92dc1'
branch_labels = None
depends_on = None


def upgrade():
    db = op.get_bind()

    fix_process = db.execute(
        "SELECT column_name FROM information_schema.columns WHERE table_name = 'image_info';").fetchone()
    if not fix_process:
        db.execute("""\
CREATE TABLE image_info (
  image_no SERIAL NOT NULL
  ,camp_no INTEGER NOT NULL
  ,image_name TEXT NOT NULL
  ,reg_date TIMESTAMPTZ DEFAULT now()
  )
WITH (fillfactor=80);

ALTER TABLE image_info ADD CONSTRAINT image_info_pkey PRIMARY KEY (image_no);

ALTER TABLE image_info
  ADD CONSTRAINT image_info_camp_no_fkey FOREIGN KEY (camp_no)
  REFERENCES camp_info (camp_no)
  ON UPDATE NO ACTION
  ON DELETE NO ACTION;
""")


def downgrade():
    pass
