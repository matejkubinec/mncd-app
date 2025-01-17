namespace MNCD.Web.Models.System;

public class SystemStatus
{
    public VisualizationStatus Visualization { get; set; }
}

public class VisualizationStatus
{
    public string Url { get; set; }
    public bool Available { get; set; }
}