PGDMP                          y            gnss    12.2    13.2     �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    51408    gnss    DATABASE     f   CREATE DATABASE gnss WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'C' LC_CTYPE = 'UTF-8';
    DROP DATABASE gnss;
                postgres    false                        3079    51409    postgis 	   EXTENSION     ;   CREATE EXTENSION IF NOT EXISTS postgis WITH SCHEMA public;
    DROP EXTENSION postgis;
                   false            �           0    0    EXTENSION postgis    COMMENT     g   COMMENT ON EXTENSION postgis IS 'PostGIS geometry, geography, and raster spatial types and functions';
                        false    2            �            1259    52472    base_sta    TABLE     F  CREATE TABLE public.base_sta (
    id integer,
    stat_code character varying,
    stat_name character varying,
    x_coor double precision,
    y_coor double precision,
    elev double precision,
    "timestamp" timestamp without time zone,
    diff double precision,
    status integer,
    com_status character varying
);
    DROP TABLE public.base_sta;
       public         heap    postgres    false            �            1259    52420    dataset    TABLE     N  CREATE TABLE public.dataset (
    id integer NOT NULL,
    stat_code character varying,
    stat_name character varying,
    x_coor double precision,
    y_coor double precision,
    elev double precision,
    "timestamp" timestamp without time zone,
    diff double precision,
    status integer,
    com_status character varying
);
    DROP TABLE public.dataset;
       public         heap    postgres    false            �            1259    52418    dataset_id_seq    SEQUENCE     �   CREATE SEQUENCE public.dataset_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.dataset_id_seq;
       public          postgres    false    209            �           0    0    dataset_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.dataset_id_seq OWNED BY public.dataset.id;
          public          postgres    false    208            N           2604    52423 
   dataset id    DEFAULT     h   ALTER TABLE ONLY public.dataset ALTER COLUMN id SET DEFAULT nextval('public.dataset_id_seq'::regclass);
 9   ALTER TABLE public.dataset ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    209    208    209            �          0    52472    base_sta 
   TABLE DATA           y   COPY public.base_sta (id, stat_code, stat_name, x_coor, y_coor, elev, "timestamp", diff, status, com_status) FROM stdin;
    public          postgres    false    210   �       �          0    52420    dataset 
   TABLE DATA           x   COPY public.dataset (id, stat_code, stat_name, x_coor, y_coor, elev, "timestamp", diff, status, com_status) FROM stdin;
    public          postgres    false    209   w       L          0    51714    spatial_ref_sys 
   TABLE DATA           X   COPY public.spatial_ref_sys (srid, auth_name, auth_srid, srtext, proj4text) FROM stdin;
    public          postgres    false    204   �5       �           0    0    dataset_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.dataset_id_seq', 683, true);
          public          postgres    false    208            R           2606    52425    dataset dataset_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.dataset
    ADD CONSTRAINT dataset_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.dataset DROP CONSTRAINT dataset_pkey;
       public            postgres    false    209            �   �   x���;�0������+z�.z������5�*#��0��߈�����5����5	F�y�x >ρ����x�sf2�*z1��@u˰.F2�	Ա<v���=#�͜��\����S����왿�W-�|K�I�      �      x��]I�,��\�
]@	��;D�@�^�	�����A��tcD7���7�h����?�m��?j��J���������匳�4�Ø?���������RJbl�M��X������DϦ�d^�\ݧ�E�����/�^L�{K�l�>��EF6G��S��ƒKM}͉�s��閸�S41�m̯V�cV�~̲�E�W����}�%:}���&Y�L��s\�'�9��K�h����>���v���B�LK�D���Õ��r��^�p/=-"c�f�u̒g>�{����%3��2�TS��/gn������<)x, ܒ]�a�e�)������
�e�vL�ZQ$
���O�[D:��b�H��~g��(�2�4m�e,�C0��_(�a�"�T�۬�\̥��;�RQ��=�u�Aμ�3w@u5F@�N3\��O�#(��hբ8|O.C�u>L��g{�����@�DNug$��t����N|�u(�a�c���u3�8r�x����2�{iW�>�Һ�E>��Ƀ�Kh��� ���]ws���s e��Yj4���=΢��-��Y�y�?�nh����d��3?bO}�U��/���.�o.h�� :��9���n}��ڢ���y:���)�������8Y5�O�}E]'	��	>���SJ�]\��M���<ś_�}��\U��8�@�c��.�2���]�@&�����h	5=�\F��A�~O��E���>C�Ɲ�R�����Ӽ��#���'�;�ς�b��u;�}�"�qa��x���@Q�(�wsQ� .=H��*�0jWNn>��E���}7 A|�5���#�б���ȁuS툲#�Ai=��=�O�u؏�
D}�D��s�"r�����d��!�T��^�ψ<��;U�[��-ZlG�����.�sO�æ8(�
���Q���^yzĹ�����BB��4h�	v�i@���29�� v�GQp�E���9u�����<9���U���ڭ!�B��~�#zz�$k	�,�K���a���O�ù��kq�z�gU���C�l s�]�*W��=�a��RB7Hu9�	�q�>(<:��y��2/�%����Q%f*�_��I�~Ernh��������O����3O��r�Z�SE/y�83XHj�)Aa>^g���E�dK7��?�j�)z��]�(�TE
ٴ�j�3At�F�Wx�����Ւ|��{<f�J`QIy�'��`�L�7ꞅ��
�[�$f�5=�K��B栺D��ο�,.ߛ"��Ʒ�q�~ ��j�^�^�28��r�,r��x���E� ��{C9+�&_�j��8|���<i��%��x�fơ�Wņ�'�˝ ��q�=��<���qQ�s�$ҩ@
(����}!^��Eeu�|�1��Z}�!I�f�b��m+͑�R�_�X �Nj��x��m]DJAޗ�����^�� ʽ�;GC�1I������5�)%��.�i����=���dX���W�lbg~y� ��&�B�s�I}ue4�_f���5I�A�Қ"`��5JXP�3zua-Xád�k7Jy	^�+₭��i��%�̅ٻu�i�)��EI)u���1m�(W=e/L)m��ӬP��FT�@_��V��B �K�S��˯�޽I�Q��PӼPkĻ��a���E��-�"9�vJ�]���ar 0<_OL�Pa<����
��d��\��d�+���HnF�gz	��1���&���ʟ.qÝ��O�Ɨ���d���K��B�v�2�
B/��2;�M�N]P&je����D׭�k8/P�����5���Dy�!C�/����{J���Tu��u���0�r�v;�*2+�a��}���N�g�����t���J�cVŷ[5��>��`�eF�D�<��8�p�}�����m=�R��r��t��a��z�%T�f�~���ee�L@�=ӕP&�q���L�z8�~N�K�1��`�=��PSC��Ж${�'����fl���iR�n��J]�L�&��LT
�,�M`pB��:U��X>C�tP�[��CU=�9�EO�)��`�w7ڲ/��#��A��|�`���u��h��2��[h�x����e
kM�s�)�̾�T�M7�o����u?�f��$�ˍE��+l�xJ���� ���}%��JRl�xӄ����7�KBZ�(|z�����.PS�ШZ���@�nf���h�Bi�*|���I�L7C�Ђ#kzpř�O��;j�xx�ʝ�MiU���:��$$
#��˪0B"^u�w[p���� 	@�^K	֓�$�1�:��dTn����g)�%
��mڵ�x.@�xgm�=6P�\� �gTu����Y�T�I�b��M+Q oaC9�v�z��&��gZ,�s]Yn#��'3$��殛�\��e����5`=^�)ڑ^�X9d�y4̙�%�v���<g�i ����0N�4�C��2Ա�3��d�q�d*`a�r�>	v��e�O���7fʓ��o'WwUR�£����1�°¡v(-��y>B��P(�%�٫H�+Fb�R��&�2������-M�a��y��L
?�^	5��
�Jp�#Z^�T��!}��ݒ����?ˋ\j�K.��)?+Mf�u��|*sV�ݘP��9U�)%��Ш���4ō�{�UK��C�[�8&�!+�I������y�����ß��P��OU�;���T
���+O���u�?����a+O�`��1
^H�б�;'%Y�<a��4��S��a�(<��#q��yX<T��<�p��KqG�F���s�P0�5���Qd�A��
&����/	�Rߴx��ny�	��)/�ܝ=|x���R|Ւ ';8áT�T��A�xʄ���zf�����oR���&�[`�8�S��{����sQpgi�7��^�ff��24M%����Vj�r,�eGw_�<o����q��빹� ��7h�@���Ǝ�L@T��O�}U2�>�\Ib�훻\��؄J�,/���1��wsAr���ŹW�OEP��E��\���*<]�e�Ĉ9Ʊjb,=��eF�"�䕐U�(3bΖ{��xzx��851?�3����m��N�7�_��a�(�UU?9�FGJ�u��
��^X[�@ 0��8�b�ݓo�/\��lq���-��|B����j���ɟqJ�t+CX`�"�M�%'e��F��k?P*�{u>S�;�8�b
c���2S(�C(CY�GV�CrA�(�Mp2:W�}��0��߄�����ф�[�8��B�[�,DI����
�g7�y*WhQ<�S�����_�;ʩ��.��?�U�'�4��t0�bZ�:��hlb'Qlb�]��
j7�|5�τ�a����C�'M�\�P(��"���y`� �u�"S���?�kف����\L��z�}-f1ǝA�˼�I��7����:Q���?��
�
���H���u�"���RP�F�P("-l�o�[�,��[�E����%uC�m�+#�R2��Jk& MuJ��s(��[rJb���Y�`���_�h�o���Д���-tO�s�"CS,`�Z��0��I��N�_o�Z9^�2����N�v��@�#��J��E��d��-�z�	�=��K��To��T����%���4�P� x��q��)�)�;�-�o<�!��	N����k���28%�>��B��FB�s*i�'JJ�X�u�L�un�5@�]�X
 �v��D���Yn]���Z�[;>IYe�J���a���]����;*� �L�d��oXBׄ!}�Q^Q��yB�jJ�Ai2N=r��S�PJJ8J	|�C�9�����Z��޵��d�% Wh���p%\fP Dl�Jd�Jb��s��k���{`�����U#|$��5�+Li=Z55�,<�s[�h׎�_B��	W���͇P�j^B�=����_x������M�H�aƎ�^�Jބ�V��5�gT���
%A>�dp��	|���-�    K�p�Oq9'eK�f��
M����jP��Tha�*��S��eL����W�%��^/'*wN��Y=|��!i�U����%�L��k<�����U]=����X�x���|l���>C(/B�=��_�2E�S�x��[*��I�~�pBOb��MɈ�����P���"t�JÖz�&m��?�'�yI��<���V����W�PǦ��hs>l&�M���{�"b��߽a0L�.�m�@i�l�W�W��(�x3��+:u�p��J��ºص�݋G|����#��R�#�p���cn����y"���m��Z���4�`���b�Cٍ�*�_`�{�=ZU�9��Ì�[%P��=��r-2Q�n����z1� n��<���r �����("'�VyH�--^�ͦ3��	��ѡW��Y+���ʡ�g�������wJ{M}�ߐ����u%2�:��_)�{G}�~�a6��
)JxGq(ʪr�	o�;����^|:�;����n^pJP�������^�l�+t�KR"���Bi���TL���B�,�;~5�d����yH��=�
5������7^޿��t�������<�C���S
BN���G�B��/������$�th��A�0��N(����=��%N ���K�a��-	�/za�Q5�����x�y9]����/�I����ﹶi�P��b�2ݣ:�[1 M �����zA}����@��r�^S��Lr��61�Vt���G#��&ԙ|(
��҂��P��1#�M�>ͪ�
6,�6Q���	��zJ�Hn�%+;
�����6�Ū�c'��>KM�M`RT7�	M�71�?����N�S���E��T,���(m"��'�`��-���(���{���猉�"~��H�B����)v�~
ր����(��<Cx�o@Ay�g���U�[����A6����|���,�}e!=4��%����i��=����aJ�!-�$�}j���d~C��1>�W�S��+�秫P	��}����w�y�%�/���I�4L�+��H�v�s$� 2�G��#*T$Q�K_�	�w���#q>�o�\i���9�:E⸟�N�i�΁�='�|}���O�
��G���ƙ�_?���~���#)(J�#%����I��k�'�χ��JF9'^į�H�������fM[���W��P���q	3��������Y����l��"�&s:���]'*� 4���°��(얲�gr����CB��4x�����û���̽|N�Ë�BZ�r��UHj����cq�I����	{�C�c8s>��%��P���_�:M�>��Ů��}���:Č�24���O��������j?}ڟ�`[?��k�^m���Ra�A)���n��݄/�
=�W���l�NQ�k�·H�� 8r��r�4"������3�6t��\�2 u��Oh!3���|�W�����Y+����,a��#a�%	�*����0)�?*CѬK������E���*��WC��.)��3ς�۷`ބ���ws�*"#���>���䌓ꏀ���Pwd0����6�<��J�ʝfl�����`hpg=�Ф�Lʰ�<�[��4a� ߠ	�����s�� <^iÐ�K�?�=yy����$S�����>myx������U��;%�_����^�"��w6>~�F>�n��=,k=�%i��	�SR#F�������B�� ���t��`�*�C��{����s��-����N��$��R0Y�!�΅�zN�C���x����G[_	��	��Z~�M��|G]��{��:�]=�3����m?���W��1(�f�Ó2�|��z<��P�M�{���~7��ث�t�3%t̏5 ���.��Ndm�U�8��=~�	�O��藰g_�R�JX"��[Ξ�����]�i�p#�z�~)+�J�%����S4U�zş�R�~29��~�ۇT�U'�g�])�>�ґ1<wM��	�����8oK��^�3�C����_����!oJ�!�)�ɞҶ}6ZQ����8O��(Q>\�����E�^�JV���w/ʟ8yh��i�Ǖ&��j�^�Շ��ÓBِ��8��b�V^���R��:'�����a\x�}��^�=Ud�8��S��=��"�z�����$���{G��ң����>������[ZQ`�N'l i����#z2d�i�ȫ��U���߇
��P)���z�/ؐɽ�[��^��X��y������9
�����Z���h��5�]{����L;r�V%ՄH�!��)e�?|�(�b�����+~���@���'*��5�k��"��E�����@}J�Pd�a���-��z�n7�*�;p��t�`U�c�>)�J��a_��2~����YU�v�FI�r-f�A?w�U^@��k���&�|�.P�ւF�Z����x�/(�b���Nq���s��sO9����.����'jH�(�b'�h3��Lyx�y�~����M�R��T���5�R߄�N��&V"�V
ޟ�^�Ӂ3aW��l!�?�KL�>#r�-�<�;_"��/�_��]���`��3$�"�KVR@�����]�]Kt�����E(�E�ׄE@���I�	e�;����G�Q2�h]즖z5R�	Eh�1�����m�C'H�gZ�x��a���$�-E�х���	~*ŏ݃�C����Ls1Q��į�b��R4�5tN�����4�|�ol�̋P9�V��oj�Vra|̈�м[\ee0�/��km`���C�0r�н*m1�#R)���ë���z����"y�GYn#��;U7���|�$�&C_ԕ�G��y4�#a�!�F8{*>�P���y�ك���0���V]��!�D(��l�u��8{�<��>�(���7�3 �ai�����<ڃG,�p���p���C(D�K���=�MG��4׭�_T>�-wIv�q��r^���r8�EIϹ���`Ѿ�S��]w4h��h�SB8�2��z��pJ�3m+m�gJ���P����?�ۼ�X:�K �^g�Yq��=Z��4mCx�#W�q(Ệ����#��QτE�qg������QG�S���]��cX�c�lG��\��x|�B���O�.��0�Dɩ8�>�+���Η�s%�ѕ��?�n��?yWB��t�Btܡ)%n��3%#����q����vd�D�s,���G��?x0=uh�X��k��c��k^�3��g�h��m��l�<�$�NA���M��$w�S�!�چQ^��"z�h!AMu���;8w���Ҟl�鋧X2��=V��/�3(�,�U���/��(�lZ��b�i��\Q�8n�'�����B�P�BԡMq��A�4t������η���+�c�>M�(����@�d�b�w0E�@`(�&2~UOnb��Iɉh�>��Y���)u�L����O�X�ȃC�&�����u��9���RUO��#��b��!�^�C�_L0S�%�V���C"wM�ǎz�ӗ�����<����s%R��������c��I��i��w�=��O�0ʋ<�{��E�S�����^ytR�7(1qϴr�i�>W�2/.7(���L�Fx8I�<�Ƙ^�t{���|h~x�ni-��[[��'���ئ-�Τ��8��?��W$xO<�+���+1Oe������[���dC3/Y����Y;v�s��2�QU O9{�-�77R/ȣ�XQ�����CRu4��1����>�XT�-�B�����O���s��)��ת�(pc�Q�r�B{���$s8����~goJC�
���o�JD"/Cc���2*9=U)?b~X��i��8�Rʖ��KdUI�Y_{7f�*c�D8�==%LD��'b@��>h��%�U��kn�:�h�u�4���«����������KL5�����^}�x�K�}��
���^�%�%�ujG)]b���m��a�W=�V&��y>;EP��|!oU=��p�E)sw��a���w:P&4 ;  B����Mp̔{'��z��JR{Μ0ʻ���<��RJ�@6�p%u��U|J���YU�)|�<4���P�6 }��Թs?������#��k�pCR>�4>`��G����K�/�9ze%������I�R� #ݻ��Sbc��1�k1����\J�A7F����FPl]|�_���ǸOn������mȢ��������D��̟jJ��}dy5�׏���ݓ���i��6�ȧ�䱳�J���o`��lۙ�?�T��F�K��ɗ�
�oW�#��o��MF��1��ǆϵ��
��i�c��Hg?6��Ty@S���G�O���@kݣ]#/7�>�]�&Q�~Cy\gm*�.�q١����8���~S�>��Xg�w6׮�S��|�߼%�K᫹r*i�����#[24F>��5�6��L�	4�?Y���+
k=�������H�貗�K�%)3>��72\VȤ_|�G���G�OΗ�f����<#c�������0��[��g�ϳ���nd�N%&���C�H����i��'���y����T.�iA�
]N��?�rG5g4��Q������Ps{�3L_xT�[2|��q2��ɑ�FZ�"�|92��Of���-ڧ��o>y���ˀ�{A'�><jЗkxi���˟|Ԡ��X>��5=�\�#÷u���l��,7�f<{���Ke]�}�����Ƴ
�FƆ��d�thJ<{�12�6�5;�d�N�<��ir�}/�<��odj���6Rf{V�>��˫�\+�ͳ'#�'��rY�ٓ���cm�}XW��9��l��O���Lg+�G��IWl�Z���<z2�����$����1���Wr�r�{��G+4F^��&���al�1���ۂUH>/~y�6��!��tT���+#��\i<���B22bq���7�*$#k��[�%١c0t�L-m�B�V&f(͐��B�+��7l�(@~�֗��u�F�?�ߺ����o�����[�	���5�2��y����:�+/w���,�}�[k��pȮzA{_�6ں+��mMct�\�;��.}��{�z?�m�e�r��أ�i�%|{���@�+��#��t���}�>������~�      L      x������ � �     