"""story_info

Revision ID: bc3423c68cd3
Revises: 16cfe1a1a41c
Create Date: 2021-08-18 17:41:06.366506

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'bc3423c68cd3'
down_revision = '16cfe1a1a41c'
branch_labels = None
depends_on = None


def upgrade():
    db = op.get_bind()

    fix_process = db.execute(
        "SELECT column_name FROM information_schema.columns WHERE table_name = 'story_info';").fetchone()
    if not fix_process:
        db.execute("""\
CREATE TABLE gallery_info (
gallery_no serial NOT NULL, -- 넘버
gallery_caption TEXT, -- 앨범 캡션
gallery_type SMALLINT, -- 앨범 타입
create_user INT, -- 작성자
reg_date TIMESTAMPTZ DEFAULT now()  
)
WITH (fillfactor=70);

ALTER TABLE gallery_info ADD CONSTRAINT gallery_info_pkey PRIMARY KEY (gallery_no);


CREATE TABLE story_info (
story_no serial NOT NULL, -- 넘버
story_subject TEXT, -- 제목
story_content TEXT, -- 내용
story_type SMALLINT, -- 1. 일반캠핑 OR 2. 차량
create_user INT, -- 작성자
reg_date TIMESTAMPTZ DEFAULT now()  
)
WITH (fillfactor=70);

ALTER TABLE story_info ADD CONSTRAINT story_info_pkey PRIMARY KEY (story_no);


CREATE TABLE user_info (
user_no serial NOT NULL, -- 넘버
user_name TEXT, -- 이름
user_eamil TEXT, -- 이메일
user_phone TEXT, -- 연락처
user_type SMALLINT, -- 타입 (관리자, 특정권한사용자, 일반사용자)
is_enable SMALLINT, -- 삭제유무
login_fail_count SMALLINT, -- 실패횟수
extra_info jsonb DEFAULT '{}',
modify_date TIMESTAMPTZ DEFAULT now(),
reg_date TIMESTAMPTZ DEFAULT now()
)
WITH (fillfactor=70);

ALTER TABLE user_info ADD CONSTRAINT user_info_pkey PRIMARY KEY (user_no);


CREATE TABLE user_stroy (
user_story_no serial NOT NULL, -- NO
story_no serial NOT NULL, -- 넘버
user_no serial NOT NULL, -- 넘버
is_like SMALLINT, -- 좋아요
is_scrap SMALLINT, -- 스크랩
reg_date TIMESTAMPTZ DEFAULT now()
)
WITH (fillfactor=70);

ALTER TABLE user_stroy ADD CONSTRAINT user_stroy_pkey PRIMARY KEY (user_story_no);

ALTER TABLE user_stroy
  ADD CONSTRAINT user_stroy_story_no_fkey FOREIGN KEY (story_no)
  REFERENCES story_info (story_no)
  ON UPDATE NO ACTION
  ON DELETE NO ACTION;
 
ALTER TABLE user_stroy
  ADD CONSTRAINT user_stroy_user_no_fkey FOREIGN KEY (user_no)
  REFERENCES user_info (user_no)
  ON UPDATE NO ACTION
  ON DELETE NO ACTION;
 

CREATE TABLE user_gallery (
user_gallery_no serial NOT NULL, -- NO
gallery_no serial NOT NULL, -- 넘버
user_no serial NOT NULL, -- 넘버
is_like SMALLINT, -- 좋아요
is_scrap SMALLINT, -- 스크랩
reg_date TIMESTAMPTZ DEFAULT now()
)
WITH (fillfactor=70);

ALTER TABLE user_gallery ADD CONSTRAINT user_gallery_pkey PRIMARY KEY (user_gallery_no);

ALTER TABLE user_gallery
  ADD CONSTRAINT user_gallery_gallery_no_fkey FOREIGN KEY (gallery_no)
  REFERENCES gallery_info (gallery_no)
  ON UPDATE NO ACTION
  ON DELETE NO ACTION;
 
ALTER TABLE user_gallery
  ADD CONSTRAINT user_gallery_user_no_fkey FOREIGN KEY (user_no)
  REFERENCES user_info (user_no)
  ON UPDATE NO ACTION
  ON DELETE NO ACTION;
  
 
CREATE TABLE comment_info (
comment_no serial NOT NULL, --NO
story_no int, -- NO
parent_no int, -- 부모 넘버 빈값이면 상위
create_user int, -- 유저
comment_content TEXT, -- 댓글내용
reg_date TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE comment_info ADD CONSTRAINT comment_info_pkey PRIMARY KEY (comment_no);

ALTER TABLE comment_info
  ADD CONSTRAINT comment_info_story_no_fkey FOREIGN KEY (story_no)
  REFERENCES story_info (story_no)
  ON UPDATE NO ACTION
  ON DELETE NO ACTION;
""")


def downgrade():
    pass
