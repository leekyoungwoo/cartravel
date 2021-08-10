import requests
import xmltodict
import importlib
import urllib.request
import re
from config import GLOBAL_CONFIG
from uuid import uuid4
import os


def check_param_is_none(p, target, rm_space=False):
    ret = str(p[target]).strip() if target in p and p[target] else None
    if ret and rm_space:
        ret = re.sub(r'\s{2,}', ' ', ret)
    return ret

root_dir = GLOBAL_CONFIG.FILE_ROOT_DIR
db = importlib.import_module('db')
db.connect()
server_key = 'Gf6VA4AA34aguQPOZB3/WpW6844XA5bttIBppXSXLrIdSMD/NkBC+pIaazZciA24AzstHTcYhywLy+OMn5dAFw=='
base_params = {
    'serviceKey': server_key,
    'pageNo': 4,
    'numOfRows': 800,
    'MobileOS': 'ETC',
    'MobileApp': 'AppTest'
}
based_list = requests.get('http://api.visitkorea.or.kr/openapi/service/rest/GoCamping/basedList', params=base_params)
camp_dict = xmltodict.parse(based_list.text)


if 'response' in camp_dict and 'body' in camp_dict['response'] and 'items' in camp_dict['response']['body'] and camp_dict['response']['body']['items']:
    camp_list = camp_dict['response']['body']['items']['item']
    for camp in camp_list:
        exist = db.query_one("""
SELECT *
FROM camp_info
WHERE content_id = %s
""", [camp['contentId']])

        if exist:
            continue

        image_name = "{}.png".format(str(uuid4()))
        insert_dict = {
            'addr1': check_param_is_none(camp, 'addr1'),
            'addr2': check_param_is_none(camp, 'addr2'),
            'allar': check_param_is_none(camp, 'allar'),
            'animal_cmg_cl': check_param_is_none(camp, 'animalCmgCl'),
            'auto_site_co': check_param_is_none(camp, 'autoSiteCo'),
            'bizrno': check_param_is_none(camp, 'bizrno'),
            'brazier_cl': check_param_is_none(camp, 'brazierCl'),
            'carav_acmpny_at': check_param_is_none(camp, 'caravAcmpnyAt'),
            'carav_inner_fclty': check_param_is_none(camp, 'caravInnerFclty'),
            'carav_site_co': check_param_is_none(camp, 'caravSiteCo'),
            'cltur_event_at': check_param_is_none(camp, 'clturEventAt'),
            'content_id': check_param_is_none(camp, 'contentId'),
            'createdtime': check_param_is_none(camp, 'createdtime'),
            'do_nm': check_param_is_none(camp, 'doNm'),
            'exprn_progrm_at': check_param_is_none(camp, 'exprnProgrmAt'),
            'extshr_co': check_param_is_none(camp, 'extshrCo'),
            'faclt_div_nm': check_param_is_none(camp, 'facltDivNm'),
            'faclt_nm': check_param_is_none(camp, 'facltNm'),
            'feature_nm': check_param_is_none(camp, 'featureNm'),
            'fire_sensor_co': check_param_is_none(camp, 'fireSensorCo'),
            'frprvt_sand_co': check_param_is_none(camp, 'frprvtSandCo'),
            'frprvt_wrpp_co': check_param_is_none(camp, 'frprvtWrppCo'),
            'glamp_site_co': check_param_is_none(camp, 'glampSiteCo'),
            'gnrl_site_co': check_param_is_none(camp, 'gnrlSiteCo'),
            'homepage': check_param_is_none(camp, 'homepage'),
            'induty': check_param_is_none(camp, 'induty'),
            'indvdl_carav_site_co': check_param_is_none(camp, 'indvdlCaravSiteCo'),
            'insrnc_at': check_param_is_none(camp, 'insrncAt'),
            'intro': check_param_is_none(camp, 'intro'),
            'lct_cl': check_param_is_none(camp, 'lctCl'),
            'line_intro': check_param_is_none(camp, 'lineIntro'),
            'manage_nmpr': check_param_is_none(camp, 'manageNmpr'),
            'manage_sttus': check_param_is_none(camp, 'manageSttus'),
            'mange_div_nm': check_param_is_none(camp, 'mangeDivNm'),
            'map_x': check_param_is_none(camp, 'mapX'),
            'map_y': check_param_is_none(camp, 'mapY'),
            'modifiedtime': check_param_is_none(camp, 'modifiedtime'),
            'oper_de_cl': check_param_is_none(camp, 'operDeCl'),
            'oper_pd_cl': check_param_is_none(camp, 'operPdCl'),
            'posbl_fclty_cl': check_param_is_none(camp, 'posblFcltyCl'),
            'sbrs_cl': check_param_is_none(camp, 'sbrsCl'),
            'sigungu_nm': check_param_is_none(camp, 'sigunguNm'),
            'site_bottom_cl1': check_param_is_none(camp, 'siteBottomCl1'),
            'site_bottom_cl2': check_param_is_none(camp, 'siteBottomCl2'),
            'site_bottom_cl3': check_param_is_none(camp, 'siteBottomCl3'),
            'site_bottom_cl4': check_param_is_none(camp, 'siteBottomCl4'),
            'site_bottom_cl5': check_param_is_none(camp, 'siteBottomCl5'),
            'site_mg1_co': check_param_is_none(camp, 'siteMg1Co'),
            'site_mg1_vrticl': check_param_is_none(camp, 'siteMg1Vrticl'),
            'site_mg1_width': check_param_is_none(camp, 'siteMg1Width'),
            'site_mg2_co': check_param_is_none(camp, 'siteMg2Co'),
            'site_mg2_vrticl': check_param_is_none(camp, 'siteMg2Vrticl'),
            'site_mg2_width': check_param_is_none(camp, 'siteMg2Width'),
            'site_mg3_co': check_param_is_none(camp, 'siteMg3Co'),
            'site_mg3_vrticl': check_param_is_none(camp, 'siteMg3Vrticl'),
            'site_mg3_width': check_param_is_none(camp, 'siteMg3Width'),
            'sited_stnc': check_param_is_none(camp, 'sitedStnc'),
            'swrm_co': check_param_is_none(camp, 'swrmCo'),
            'thema_envrn_cl': check_param_is_none(camp, 'themaEnvrnCl'),
            'toilet_co': check_param_is_none(camp, 'toiletCo'),
            'trler_acmpny_at': check_param_is_none(camp, 'trlerAcmpnyAt'),
            'trsagnt_no': check_param_is_none(camp, 'trsagntNo'),
            'wtrpl_co': check_param_is_none(camp, 'wtrplCo'),
            'zipcode': check_param_is_none(camp, 'zipcode'),
            'first_image_url': image_name if 'firstImageUrl' in camp and camp['firstImageUrl'] else None
        }

        camp_info = db.insert('camp_info', insert_dict, returning='camp_no, content_id')[0]

        if not os.path.isdir(os.path.join(root_dir, 'campImages', str(camp_info['camp_no']), 'thumbNail')):
            os.makedirs(os.path.join(root_dir, 'campImages', str(camp_info['camp_no']), 'thumbNail'))

        if 'firstImageUrl' in camp and camp['firstImageUrl']:
            try:
                urllib.request.urlretrieve(camp['firstImageUrl'],
                                           os.path.join(root_dir, 'campImages', str(camp_info['camp_no']), 'thumbNail', image_name))

            except Exception as e:
                print(e)
                continue

        params = {
            'serviceKey': server_key,
            'MobileOS': 'ETC',
            'MobileApp': 'AppTest',
            'contentId': camp_info['content_id']
        }

        image_list = requests.get('http://api.visitkorea.or.kr/openapi/service/rest/GoCamping/imageList', params=params)
        try:
            image_dict = xmltodict.parse(image_list.text)
        except Exception as e:
            print(e)

        if 'response' in image_dict and 'body' in image_dict['response'] and \
                'items' in image_dict['response']['body'] and image_dict['response']['body']['items']:
            images = image_dict['response']['body']['items']['item']

            if not isinstance(images, list):
                images = [images]

            for image in images:
                if 'imageUrl' in image and image['imageUrl']:
                    image_name = "{}.png".format(str(uuid4()))
                    try:
                        urllib.request.urlretrieve(image['imageUrl'],
                                                   os.path.join(root_dir, 'campImages', str(camp_info['camp_no']), image_name))
                    except Exception as e:
                        print(e)
                        continue

                    image_insert = {
                        'camp_no': camp_info['camp_no'],
                        'image_name': image_name
                    }

                    db.insert('image_info', image_insert)




