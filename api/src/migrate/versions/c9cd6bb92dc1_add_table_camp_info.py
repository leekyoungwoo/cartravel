"""'add_table_camp_info'

Revision ID: c9cd6bb92dc1
Revises: a3f97dc84759
Create Date: 2021-08-09 18:28:46.704482

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'c9cd6bb92dc1'
down_revision = 'a3f97dc84759'
branch_labels = None
depends_on = None


def upgrade():
    db = op.get_bind()

    fix_process = db.execute(
        "SELECT column_name FROM information_schema.columns WHERE table_name = 'camp_info';").fetchone()
    if not fix_process:
        db.execute("""\
CREATE TABLE camp_info (
  camp_no serial NOT NULL, -- 넘버
  addr1 text, -- 주소1
  addr2 text, -- 주소2
  allar int, -- ?
  animal_cmg_cl text, -- 반려동물 정보
  auto_site_co int, -- ? (오토캠핑장 사이트 크기)
  bizrno text, -- ?
  brazier_cl text, -- 화로대 방식
  carav_acmpny_at text, -- ? (카라반 관련?)
  carav_inner_fclty text, -- 카라반 내부시설
  carav_site_co int, -- ? (카라반 사이트 크기)
  cltur_event_at text, -- ?
  content_id int, -- GO캠핑 넘버
  createdtime timestamp with time zone DEFAULT now(), -- 등록일
  do_nm text, -- 행정구역 8도
  exprn_progrm_at text, -- ?
  extshr_co int, -- ?
  faclt_div_nm text, -- 운영기관 (민간, 지자체 등)
  faclt_nm text, -- 캠핑장 이름
  feature_nm text, -- ?
  fire_sensor_co int, -- ?
  first_image_url text, -- 썸네일 이미지
  frprvt_sand_co int, -- ?
  frprvt_wrpp_co int, -- ?
  glamp_site_co int, -- 글램핑 사이즈
  gnrl_site_co int, -- 일반 야영장 사이즈
  homepage text, -- 캠핑장 홈페이지
  induty text, -- 캠핑장 유형
	indvdl_carav_site_co int, -- ?
	insrnc_at text, -- ?
	intro text, -- 소개
	lct_cl text, -- 캠핑장 환경
	line_intro text, -- 부제목
	manage_nmpr int, -- ?
	manage_sttus text, -- 운영 유무
	mange_div_nm text, -- 위탁or직영
	map_x NUMERIC, -- 위치 x좌표
	map_y NUMERIC, -- 위치 y좌표
	modifiedtime timestamp with time zone DEFAULT now(), -- 수정일
	oper_de_cl text, -- 오픈 주중,주말
	oper_pd_cl text, -- 오픈 계절
	posbl_fclty_cl text, -- 주변 이용가능 시설
	sbrs_cl text, -- 캠핑장 시설정보
	sigungu_nm text, -- 행정구역 (시, 군, 구)
	site_bottom_cl1 int, -- 1잔디 크기
	site_bottom_cl2 int, -- 2파쇄석 크기
	site_bottom_cl3 int, -- 3테크 크기
	site_bottom_cl4 int, -- 4 크기
	site_bottom_cl5 int, -- 5 크기
	site_mg1_co int, -- 1사이트 크기
	site_mg1_vrticl int, -- 1사이트 세로
	site_mg1_width int, -- 1사이트 가로
	site_mg2_co int, -- 2사이트 크기
	site_mg2_vrticl int, -- 2사이트 세로
	site_mg2_width int, -- 2사이트 가로
	site_mg3_co int, -- 3사이트 크기
	site_mg3_vrticl int, -- 3사이트 세로
	site_mg3_width int, -- 3사이트 가로
	sited_stnc text, -- ?
	swrm_co text, -- ?
	thema_envrn_cl text, -- ?
	toilet_co text, -- ?
	trler_acmpny_at text, -- ?
	trsagnt_no text, -- ?
	wtrpl_co text, -- ?
	zipcode text -- ?
)
WITH (fillfactor=70);

ALTER TABLE camp_info ADD CONSTRAINT camp_info_pkey PRIMARY KEY (camp_no);
""")


def downgrade():
    pass
