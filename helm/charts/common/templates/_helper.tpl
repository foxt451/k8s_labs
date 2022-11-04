{{/*
Імʼя. Обрізається до 63-х символів, через обмеження Kubernetes. `nameOverride` дозволяє перевизначати імʼя.
*/}}
{{- define "common.name" -}}
{{- default .Chart.Name .Values.nameOverride | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Повне імʼя додатку (сервісу). Обрізається до 63-х символів, через обмеження Kubernetes
*/}}
{{- define "common.fullname" -}}
{{- $name := default .Chart.Name .Values.nameOverride -}}
{{ printf "%s-%s" .Release.Name $name | trunc 63 | trimSuffix "-" }}
{{- end -}}

{{/* Селектори */}}
{{- define "common.selectorLabels" -}}
app.kubernetes.io/name: {{ include "common.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end }}

{{/* Базові маркери. В даному випадку == селекторам, але як правило мають більше значень. */}}
{{- define "common.labels" -}}
{{ include "common.selectorLabels" . }}
{{- end }}

{{- /*
mylibchart.util.merge will merge two YAML templates and output the result.
This takes an array of three values:
- the top context
- the template name of the overrides (destination)
- the template name of the base (source)
*/}}
{{- define "common.util.merge" -}}
{{- $top := first . -}}
{{- $overrides := fromYaml (include (index . 1) $top) | default (dict ) -}}
{{- $tpl := fromYaml (include (index . 2) $top) | default (dict ) -}}
{{- toYaml (merge $overrides $tpl) -}}
{{- end -}}