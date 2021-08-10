CREATE ROLE "cartraveladmin" login PASSWORD 'inq!123' SUPERUSER CREATEDB CREATEROLE NOINHERIT;
CREATE DATABASE cartraveldb WITH ENCODING='UTF8' OWNER cartraveladmin;

CREATE EXTENSION pg_trgm;
CREATE EXTENSION pgcrypto;
CREATE EXTENSION intarray;

CREATE TABLE user_info (
    user_no serial NOT NULL,
    user_id text NOT NULL,
    user_passwd text,
    user_name text,
    user_email text,
    user_phone text,
    user_enabled smallint DEFAULT 1,
    login_fail_count smallint DEFAULT 0,
    passwd_update_date timestamp with time zone DEFAULT now(),
    passwd_reset_key text,
    passwd_reset_ready smallint,
    extra_info jsonb DEFAULT '{}'::jsonb,
    modify_date timestamp with time zone DEFAULT now(),
    reg_date timestamp with time zone DEFAULT now(),
    is_enable smallint DEFAULT 1
)
WITH (fillfactor=70);

ALTER TABLE user_info ADD CONSTRAINT user_info_pkey PRIMARY KEY (user_no);

CREATE INDEX user_info_user_id_idx ON user_info USING btree (user_id);
CREATE INDEX user_info_user_name_idx ON user_info USING btree (user_name) WITH (fillfactor=90);
CREATE INDEX user_info_user_name_idx_gin ON user_info USING gin (user_name gin_trgm_ops);
CREATE INDEX user_info_user_email_idx ON user_info USING btree (user_email) WITH (fillfactor=80);
CREATE INDEX user_info_user_email_idx_gin ON user_info USING gin (user_email gin_trgm_ops);
CREATE INDEX user_info_is_enable_idx ON user_info USING btree (is_enable);


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
	map_x text, -- 위치 x좌표
	map_y text, -- 위치 y좌표
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


--
-- 예시
--CREATE TABLE directory_info (
--	directory_no serial NOT NULL,
--	directory_name TEXT,
--	parent_directory_no int,
--	reg_date timestamp DEFAULT now()
--) WITH (fillfactor=80);
--
--ALTER TABLE directory_info ADD CONSTRAINT directory_info_pkey PRIMARY KEY (directory_no);
--
--CREATE INDEX directory_info_parent_directory_no_idx ON directory_info USING btree (parent_directory_no);
--CREATE INDEX directory_info_directory_name_idx ON directory_info USING btree (directory_name);
--`
--
--CREATE TABLE user_directory (
--	user_directory_no serial NOT NULL,
--	user_no int,
--	directory_no int
--)
--
--CREATE INDEX user_directory_user_directory_no_idx ON user_directory USING btree (user_directory_no);
--CREATE INDEX user_directory_user_no_idx ON user_directory USING btree (user_no);
--CREATE INDEX user_directory_directory_no_idx ON user_directory USING btree (directory_no);
--
--ALTER TABLE user_directory
--ADD CONSTRAINT user_directory_user_no_fkey
--FOREIGN KEY (user_no)
--REFERENCES user_info (user_no)
--ON UPDATE NO ACTION
--ON DELETE NO ACTION;
--
--ALTER TABLE user_directory
--ADD CONSTRAINT user_directory_directory_no_fkey
--FOREIGN KEY (directory_no)
--REFERENCES directory_info (directory_no)
--ON UPDATE NO ACTION
--ON DELETE NO ACTION;
--
--CREATE TABLE file_info (
--	file_no serial NOT NULL,
--	file_name TEXT,
--	raw_name TEXT,
--	directory_no int,
--	reg_date timestamp DEFAULT now()
--) WITH (fillfactor=80);
--
--ALTER TABLE file_info ADD CONSTRAINT file_info_pkey PRIMARY KEY (file_no);
--
--CREATE INDEX file_info_file_no_idx ON file_info USING btree (file_no);
--CREATE INDEX file_info_file_name_idx ON file_info USING btree (file_name);
--CREATE INDEX file_info_file_name_idx_gin ON file_info USING gin (file_name gin_trgm_ops);
--CREATE INDEX file_info_directory_no_idx ON file_info USING btree (directory_no);
--
--ALTER TABLE file_info
--ADD CONSTRAINT file_info_directory_no_fkey
--FOREIGN KEY (directory_no)
--REFERENCES directory_info (directory_no)
--ON UPDATE NO ACTION
--ON DELETE NO ACTION;