using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MNCD.Data;
using MNCD.Domain.Entities;
using MNCD.Domain.Services;
using System.Linq.Expressions;
using MNCD.Domain.Exceptions;

namespace MNCD.Services.Impl
{
    public class AnalysisSessionService : IAnalysisSessionService
    {
        private readonly MNCDContext _ctx;

        public AnalysisSessionService(MNCDContext ctx)
        {
            _ctx = ctx;
        }

        public async Task<List<AnalysisSession>> GetAnalysisSessions()
        {
            return await _ctx.AnalysisSessions
                .Include(a => a.Analyses)
                .OrderBy(a => a.CreateDate)
                .ToListAsync();
        }

        public async Task<AnalysisSession> GetAnalysisSession(int id)
        {
            if (id <= 0)
            {
                throw new ArgumentException("Id must be greater than zero.", nameof(id));
            }

            var session = await GetFullSession(a => a.Id == id);

            if (session == null)
            {
                throw new AnalysisSessionNotFoundException($"Analysis session with id '{id}' was not found.");
            }

            return session;
        }

        public async Task<AnalysisSession> AddAnalysisSession(string name)
        {
            if (string.IsNullOrWhiteSpace(name))
            {
                throw new ArgumentException("Name cannot be empty.", nameof(name));
            }

            var session = new AnalysisSession
            {
                Name = name,
                CreateDate = DateTime.Now
            };

            await _ctx.AnalysisSessions.AddAsync(session);
            await _ctx.SaveChangesAsync();
            return session;
        }

        public async Task<AnalysisSession> UpdateAnalysisSession(int id, string name)
        {
            if (string.IsNullOrWhiteSpace(name))
            {
                throw new ArgumentException("Name cannot be empty.", nameof(name));
            }

            if (id <= 0)
            {
                throw new ArgumentException("Id must be greater than zero.", nameof(id));
            }

            var session = await _ctx.AnalysisSessions.FindAsync(id);

            if (session == null)
            {
                throw new AnalysisSessionNotFoundException($"Analysis session with id '{id}' was not found.");
            }

            session.Name = name;

            await _ctx.SaveChangesAsync();
            return session;
        }

        public async Task RemoveAnalysisSession(int id)
        {
            if (id <= 0)
            {
                throw new ArgumentException("Id must be greater than zero.", nameof(id));
            }

            var session = await GetFullSession(a => a.Id == id);

            if (session == null)
            {
                throw new AnalysisSessionNotFoundException($"Analysis session with id '{id}' was not found.");
            }

            foreach (var request in session.Analyses.Select(a => a.Request))
            {
                request.DataSet = null;
            }

            _ctx.AnalysisRequests.RemoveRange(session.Analyses.Select(a => a.Request));
            _ctx.AnalysisResult.RemoveRange(session.Analyses.Select(a => a.Result));
            _ctx.Visualizations.RemoveRange(session.Analyses.SelectMany(a => a.Visualizations));
            _ctx.Analyses.RemoveRange(session.Analyses);
            _ctx.AnalysisSessions.Remove(session);

            await _ctx.SaveChangesAsync();
        }

        private async Task<AnalysisSession> GetFullSession(Expression<Func<AnalysisSession, bool>> predicate)
        {
            return await _ctx.AnalysisSessions
                .Include(a => a.Analyses)
                .ThenInclude(a => a.Request)
                .ThenInclude(r => r.DataSet)
                .ThenInclude(r => r.NetworkInfo)
                .Include(a => a.Analyses)
                .ThenInclude(a => a.Result)
                .Include(a => a.Analyses)
                .ThenInclude(a => a.Visualizations)
                .FirstOrDefaultAsync(predicate);
        }
    }
}
