<?php

class main_photo extends WidgetHandler
{
    function proc($args)
    {
        $tpl_path = sprintf('%sskins/%s', $this->widget_path, $args->skin);

        $widget_title_length    = $args->widget_title_length;
        $list_title_length      = $args->list_title_length;
        $list_content_length    = $args->list_content_length;

        $today_date = date("Y-m-d");

        if (!$args->limit_num)
            $args->limit_num = 5;

        if (!$args->title_name) {
            $args->title_name = "제목을 입력해주세요";
        }

        $obj = new stdClass();
        $obj->module_srl = $args->module_srls;
        $obj->order_target = $args->order_target;
        $obj->limit_num = $args->limit_num;
        $obj->notice_list = $args->notice_list;

        $output = executeQueryArray('widgets.main_photo.getPadoImageNews', $obj);
        Context::set("output", $output);

        $oDocumentModel = &getModel('document');

        $output = $output->data;
        $value_array = array();
        $loop_count = 0;


        if ($args->image_isset == "image_able")
        {
            foreach ($output as $data) {
                preg_match("/<img[^>]*src=[\"']?([^>\"']+)[\"']?[^>]*>/i", $data->content, $img);
                if ($img[1] && $loop_count < $obj->limit_num) {
                    $value_array[$loop_count] = $data;
                    $loop_count++;
                }
            }
        }

        else if ($args->image_isset == "image_unable") {
            foreach ($output as $data) {
                if ($loop_count < $obj->limit_num) {
                    $value_array[$loop_count] = $data;
                    $loop_count++;
                }
            }
        }

        $output_array = array();

        foreach ($value_array as $key => $data)
        {
            preg_match("/<img[^>]*src=[\"']?([^>\"']+)[\"']?[^>]*>/i", $data->content, $img);

            $output_array[$key] = array();

            if ($img[1])
                $output_array[$key]['image'] = $img[1];
            else
                $output_array[$key]['image'] = $tpl_path."/img/not_image.png";

            $list_date = $data->regdate;
            $date = substr($list_date, 0, 4) . "-" . substr($list_date, 4, 2) . "-" . substr($list_date, 6, 2);

            $output_array[$key]['date'] = intval((strtotime($today_date) - strtotime($date)) / 86400);
            $output_array[$key]['title'] = cut_str($data->title, $list_title_length);

            $output_array[$key]['content'] = preg_replace('!<style(.*?)<\/style>!is',"", $data->content);
            $output_array[$key]['content'] = preg_replace('@<[/]*.*?>@is',"",$output_array[$key]['content']);
            $output_array[$key]['content'] = cut_str($output_array[$key]['content'], $list_content_length);

            $output_array[$key]['document_srl'] = $data->document_srl;
        }

        Context::set("value_array", $output_array);

        $output_array['title'] = cut_str($args->title_name, $widget_title_length);
        $output_array['count'] = count($value_array);

        $output_array['title_view'] = $args->title_view;

        // conf에 있는 값을 맞춰준다.
        // $args->limit_num = $output_array['count'];

        Context::set("output_array", $output_array);
        Context::set('colorset', $args->colorset);

        $tpl_file = 'main_photo';

        $oTemplate = &TemplateHandler::getInstance();
        return $oTemplate->compile($tpl_path, $tpl_file);
    }
}